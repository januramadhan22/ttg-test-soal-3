import moment from "moment";

export const handleConvertTimestamp = (timestamp: any) => {
  const milliseconds =
    timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1000000);
  const formattedDate = moment(milliseconds).format("YYYY-MM-DD, HH:mm");
  return formattedDate;
};
