import Typography from "@material-ui/core/Typography";
import Form from "@saleor/components/Form";
import Hr from "@saleor/components/Hr";
import Skeleton from "@saleor/components/Skeleton";
import {
  Timeline,
  TimelineAddNote,
  TimelineEvent,
  TimelineEventProps,
  TimelineNote
} from "@saleor/components/Timeline";
import { OrderDetails_order_events } from "@saleor/orders/types/OrderDetails";
import { makeStyles } from "@saleor/theme";
import {
  OrderEventsEmailsEnum,
  OrderEventsEnum
} from "@saleor/types/globalTypes";
import React from "react";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";

import ExtendedTimelineEvent from "./ExtendedTimelineEvent";
import LinkedTimelineEvent from "./LinkedTimelineEvent";
import { getEventSecondaryTitle, isTimelineEventOfType } from "./utils";

export const getEventMessage = (
  event: OrderDetails_order_events,
  intl: IntlShape
) => {
  switch (event.type) {
    case OrderEventsEnum.CANCELED:
      return intl.formatMessage({
        defaultMessage: "Order was cancelled",
        description: "order history message"
      });
    case OrderEventsEnum.DRAFT_ADDED_PRODUCTS:
      return intl.formatMessage({
        defaultMessage: "Products were added to draft order",
        description: "order history message"
      });
    case OrderEventsEnum.DRAFT_CREATED:
      return intl.formatMessage({
        defaultMessage: "Draft order was created",
        description: "order history message"
      });
    case OrderEventsEnum.DRAFT_REMOVED_PRODUCTS:
      return intl.formatMessage({
        defaultMessage: "Products were deleted from draft order",
        description: "order history message"
      });
    case OrderEventsEnum.EMAIL_SENT:
      switch (event.emailType) {
        case OrderEventsEmailsEnum.DIGITAL_LINKS:
          return intl.formatMessage({
            defaultMessage: "Links to the order's digital goods were sent",
            description: "order history message"
          });
        case OrderEventsEmailsEnum.FULFILLMENT_CONFIRMATION:
          return intl.formatMessage({
            defaultMessage: "Fulfillment confirmation was sent to customer",
            description: "order history message"
          });
        case OrderEventsEmailsEnum.ORDER_CONFIRMATION:
          return intl.formatMessage({
            defaultMessage: "Order confirmation was sent to customer",
            description: "order history message"
          });
        case OrderEventsEmailsEnum.PAYMENT_CONFIRMATION:
          return intl.formatMessage({
            defaultMessage: "Payment confirmation was sent to customer",
            description: "order history message"
          });
        case OrderEventsEmailsEnum.SHIPPING_CONFIRMATION:
          return intl.formatMessage({
            defaultMessage: "Shipping details was sent to customer",
            description: "order history message"
          });
        case OrderEventsEmailsEnum.TRACKING_UPDATED:
          return intl.formatMessage({
            defaultMessage: "Shipping tracking number was sent to customer",
            description: "order history message"
          });
        case OrderEventsEmailsEnum.ORDER_CANCEL:
          return intl.formatMessage({
            defaultMessage: "Order cancel information was sent to customer",
            description: "order history message"
          });
        case OrderEventsEmailsEnum.ORDER_REFUND:
          return intl.formatMessage({
            defaultMessage: "Order refund information was sent to customer",
            description: "order history message"
          });
      }
    case OrderEventsEnum.FULFILLMENT_CANCELED:
      return intl.formatMessage({
        defaultMessage: "Fulfillment was cancelled",
        description: "order history message"
      });
    case OrderEventsEnum.INVOICE_REQUESTED:
      return intl.formatMessage(
        {
          defaultMessage: "Invoice was requested by {requestedBy}",
          description: "order history message"
        },
        {
          requestedBy: event.user ? event.user.email : null
        }
      );
    case OrderEventsEnum.INVOICE_GENERATED:
      return intl.formatMessage(
        {
          defaultMessage:
            "Invoice no. {invoiceNumber} was generated by {generatedBy}",
          description: "order history message"
        },
        {
          generatedBy: event.user ? event.user.email : null,
          invoiceNumber: event.invoiceNumber
        }
      );
    case OrderEventsEnum.INVOICE_UPDATED:
      return intl.formatMessage(
        {
          defaultMessage: "Invoice no. {invoiceNumber} was updated",
          description: "order history message"
        },
        {
          invoiceNumber: event.invoiceNumber
        }
      );
    case OrderEventsEnum.INVOICE_SENT:
      return intl.formatMessage(
        {
          defaultMessage: "Invoice was sent to customer by {sentBy}",
          description: "order history message"
        },
        {
          sentBy: event.user ? event.user.email : null
        }
      );
    case OrderEventsEnum.FULFILLMENT_FULFILLED_ITEMS:
      return intl.formatMessage(
        {
          defaultMessage: "Fulfilled {quantity} items",
          description: "order history message"
        },
        {
          quantity: event.quantity
        }
      );
    case OrderEventsEnum.FULFILLMENT_REFUNDED:
      return intl.formatMessage(
        {
          defaultMessage: "Order was refunded by {refundedBy}",
          description: "order history message"
        },
        {
          refundedBy: event.user ? event.user.email : null
        }
      );
    case OrderEventsEnum.FULFILLMENT_RESTOCKED_ITEMS:
      return intl.formatMessage(
        {
          defaultMessage: "Restocked {quantity} items",
          description: "order history message"
        },
        {
          quantity: event.quantity
        }
      );
    case OrderEventsEnum.NOTE_ADDED:
      return intl.formatMessage({
        defaultMessage: "Note was added to the order",
        description: "order history message"
      });
    case OrderEventsEnum.ORDER_FULLY_PAID:
      return intl.formatMessage({
        defaultMessage: "Order was fully paid",
        description: "order history message"
      });
    case OrderEventsEnum.ORDER_MARKED_AS_PAID:
      return intl.formatMessage({
        defaultMessage: "Order was marked as paid",
        description: "order history message"
      });
    case OrderEventsEnum.OTHER:
      return event.message;
    case OrderEventsEnum.OVERSOLD_ITEMS:
      return intl.formatMessage(
        {
          defaultMessage: "Oversold {quantity} items",
          description: "order history message"
        },
        {
          quantity: event.quantity
        }
      );
    case OrderEventsEnum.PAYMENT_CAPTURED:
      return intl.formatMessage({
        defaultMessage: "Payment was captured",
        description: "order history message"
      });
    case OrderEventsEnum.PAYMENT_FAILED:
      return intl.formatMessage({
        defaultMessage: "Payment failed",
        description: "order history message"
      });
    case OrderEventsEnum.PAYMENT_REFUNDED:
      return intl.formatMessage({
        defaultMessage: "Payment was refunded",
        description: "order history message"
      });
    case OrderEventsEnum.PAYMENT_VOIDED:
      return intl.formatMessage({
        defaultMessage: "Payment was voided",
        description: "order history message"
      });
    case OrderEventsEnum.PLACED:
      return intl.formatMessage({
        defaultMessage: "Order was placed",
        description: "order history message"
      });
    case OrderEventsEnum.PLACED_FROM_DRAFT:
      return intl.formatMessage({
        defaultMessage: "Order was created from draft",
        description: "order history message"
      });
    case OrderEventsEnum.TRACKING_UPDATED:
      return intl.formatMessage({
        defaultMessage: "Updated fulfillment group's tracking number",
        description: "order history message"
      });
    case OrderEventsEnum.UPDATED_ADDRESS:
      return intl.formatMessage({
        defaultMessage: "Order address was updated",
        description: "order history message"
      });
    case OrderEventsEnum.PAYMENT_AUTHORIZED:
      return intl.formatMessage({
        defaultMessage: "Payment was authorized",
        description: "order history message"
      });
    case OrderEventsEnum.CONFIRMED:
      return intl.formatMessage({
        defaultMessage: "Order was confirmed",
        description: "order history message"
      });
    case OrderEventsEnum.EXTERNAL_SERVICE_NOTIFICATION:
      return event.message;
  }
};

export interface FormData {
  message: string;
}

const useStyles = makeStyles(
  theme => ({
    eventSubtitle: {
      marginTop: theme.spacing(1)
    },
    header: {
      fontWeight: 500,
      marginBottom: theme.spacing(1)
    },
    linesTableCell: {
      paddingRight: theme.spacing(3)
    },
    root: { marginTop: theme.spacing(4) },
    user: {
      marginBottom: theme.spacing(1)
    }
  }),
  { name: "OrderHistory" }
);

interface OrderHistoryProps {
  history: OrderDetails_order_events[];
  orderCurrency: string;
  onNoteAdd: (data: FormData) => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = props => {
  const { history, orderCurrency, onNoteAdd } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  const getTimelineEventTitleProps = (
    event: OrderDetails_order_events
  ): Partial<TimelineEventProps> => {
    const { type, message } = event;

    const title = isTimelineEventOfType("rawMessage", type)
      ? message
      : getEventMessage(event, intl);

    if (isTimelineEventOfType("secondaryTitle", type)) {
      return {
        secondaryTitle: intl.formatMessage(...getEventSecondaryTitle(event)),
        title
      };
    }

    return { title };
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.header} color="textSecondary">
        <FormattedMessage defaultMessage="Order History" />
      </Typography>
      <Hr />
      {history ? (
        <Timeline>
          <Form initial={{ message: "" }} onSubmit={onNoteAdd} resetOnSubmit>
            {({ change, data, reset, submit }) => (
              <TimelineAddNote
                message={data.message}
                reset={reset}
                onChange={change}
                onSubmit={submit}
              />
            )}
          </Form>
          {history
            .slice()
            .reverse()
            .map(event => {
              const { id, user, date, message, type } = event;

              if (isTimelineEventOfType("note", type)) {
                return (
                  <TimelineNote
                    date={date}
                    user={user}
                    message={message}
                    key={id}
                  />
                );
              }
              if (isTimelineEventOfType("extendable", type)) {
                return (
                  <ExtendedTimelineEvent
                    event={event}
                    orderCurrency={orderCurrency}
                  />
                );
              }

              if (isTimelineEventOfType("linked", type)) {
                return <LinkedTimelineEvent event={event} key={id} />;
              }

              return (
                <TimelineEvent
                  {...getTimelineEventTitleProps(event)}
                  key={id}
                  date={date}
                />
              );
            })}
        </Timeline>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};
OrderHistory.displayName = "OrderHistory";
export default OrderHistory;
