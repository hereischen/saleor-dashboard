import * as channels from "../apiRequests/Channels";

let createdChannel;

export function deleteChannels(nameStartsWith) {
  channels.getChannels().then(resp => {
    const channelsArray = new Set(resp.body.data.channels);
    if (!channelsArray) {
      return;
    }
    channelsArray.forEach(element => {
      if (element.name.startsWith(nameStartsWith)) {
        const targetChannels = Array.from(channelsArray).filter(function(
          channelElement
        ) {
          return (
            element.currencyCode === channelElement.currencyCode &&
            element.id !== channelElement.id
          );
        });
        if (targetChannels[0]) {
          channels.deleteChannel(element.id, targetChannels[0].id);
          channelsArray.delete(element);
        }
      }
    });
  });
}
export function getDefaultChannel() {
  return channels.getChannels().then(resp => {
    const channelsArray = resp.body.data.channels;
    return channelsArray.find(function(channelElement) {
      return channelElement.slug === "default-channel";
    });
  });
}
export function createChannel({
  isActive = true,
  name,
  slug = name,
  currencyCode = "PLN"
}) {
  return channels
    .createChannel(isActive, name, slug, currencyCode)
    .then(resp => (createdChannel = resp.body.data.channelCreate.channel));
}
export function getCreatedChannel() {
  return createdChannel;
}
