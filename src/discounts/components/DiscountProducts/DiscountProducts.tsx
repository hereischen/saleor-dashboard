import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import CardTitle from "@saleor/components/CardTitle";
import { ChannelsAvailabilityDropdown } from "@saleor/components/ChannelsAvailabilityDropdown";
import Checkbox from "@saleor/components/Checkbox";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableCellAvatar, {
  AVATAR_MARGIN
} from "@saleor/components/TableCellAvatar";
import TableHead from "@saleor/components/TableHead";
import TablePagination from "@saleor/components/TablePagination";
import { makeStyles } from "@saleor/theme";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { maybe, renderCollection } from "../../../misc";
import { ChannelProps, ListActions, ListProps } from "../../../types";
import { SaleDetails_sale } from "../../types/SaleDetails";
import { VoucherDetails_voucher } from "../../types/VoucherDetails";

export interface SaleProductsProps
  extends ListProps,
    ListActions,
    ChannelProps {
  discount: SaleDetails_sale | VoucherDetails_voucher;
  channelsCount: number;
  onProductAssign: () => void;
  onProductUnassign: (id: string) => void;
}

const useStyles = makeStyles(
  theme => ({
    colActions: {
      "&:last-child": {
        paddingRight: 0
      },
      width: 76 + theme.spacing(0.5)
    },
    colName: {
      paddingLeft: 0,
      width: "auto"
    },
    colNameLabel: {
      marginLeft: AVATAR_MARGIN + theme.spacing(3)
    },
    colPublished: {
      width: 150
    },
    colType: {
      width: 200
    },
    table: {
      tableLayout: "fixed"
    },
    tableRow: {
      cursor: "pointer"
    }
  }),
  { name: "DiscountProducts" }
);

const numberOfColumns = 5;

const DiscountProducts: React.FC<SaleProductsProps> = props => {
  const {
    channelsCount,
    discount: sale,
    disabled,
    pageInfo,
    onRowClick,
    onPreviousPage,
    onProductAssign,
    onProductUnassign,
    onNextPage,
    isChecked,
    selected,
    selectedChannelId,
    toggle,
    toggleAll,
    toolbar
  } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Eligible Products",
          description: "section header"
        })}
        toolbar={
          <Button
            color="primary"
            onClick={onProductAssign}
            data-test-id="assign-products"
          >
            <FormattedMessage
              defaultMessage="Assign products"
              description="button"
            />
          </Button>
        }
      />
      <ResponsiveTable>
        <colgroup>
          <col />
          <col className={classes.colName} />
          <col className={classes.colType} />
          <col className={classes.colPublished} />
          <col className={classes.colActions} />
        </colgroup>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={maybe(() => sale.products.edges.map(edge => edge.node))}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCell className={classes.colName}>
            <span className={classes.colNameLabel}>
              <FormattedMessage defaultMessage="Product Name" />
            </span>
          </TableCell>
          <TableCell className={classes.colType}>
            <FormattedMessage defaultMessage="Product Type" />
          </TableCell>
          <TableCell className={classes.colPublished}>
            <FormattedMessage
              defaultMessage="Availability"
              description="product availability"
            />
          </TableCell>
          <TableCell className={classes.colActions} />
        </TableHead>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={numberOfColumns}
              hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
              onNextPage={onNextPage}
              hasPreviousPage={
                pageInfo && !disabled ? pageInfo.hasPreviousPage : false
              }
              onPreviousPage={onPreviousPage}
            />
          </TableRow>
        </TableFooter>
        <TableBody>
          {renderCollection(
            maybe(() => sale.products.edges.map(edge => edge.node)),
            product => {
              const isSelected = product ? isChecked(product.id) : false;
              const channel =
                product?.channelListings.find(
                  listing => listing.channel.id === selectedChannelId
                ) || product?.channelListings[0];
              return (
                <TableRow
                  hover={!!product}
                  key={product ? product.id : "skeleton"}
                  onClick={product && onRowClick(product.id)}
                  className={classes.tableRow}
                  selected={isSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      disabled={disabled}
                      disableClickPropagation
                      onChange={() => toggle(product.id)}
                    />
                  </TableCell>
                  <TableCellAvatar
                    className={classes.colName}
                    thumbnail={maybe(() => product.thumbnail.url)}
                  >
                    {maybe<React.ReactNode>(() => product.name, <Skeleton />)}
                  </TableCellAvatar>
                  <TableCell className={classes.colType}>
                    {maybe<React.ReactNode>(
                      () => product.productType.name,
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className={classes.colType}>
                    {product && !product?.channelListings?.length ? (
                      "-"
                    ) : product?.channelListings !== undefined ? (
                      <ChannelsAvailabilityDropdown
                        allChannelsCount={channelsCount}
                        currentChannel={channel}
                        channels={product?.channelListings}
                      />
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className={classes.colActions}>
                    <IconButton
                      disabled={!product || disabled}
                      onClick={event => {
                        event.stopPropagation();
                        onProductUnassign(product.id);
                      }}
                    >
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  <FormattedMessage defaultMessage="No products found" />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
DiscountProducts.displayName = "DiscountProducts";
export default DiscountProducts;
