import moment from "moment";

export const formatTime = (time, options) => {
  if (options.onlyDay) {
    return moment(time).format("DD-MM-YYYY");
  }
  return moment(time).format("HH:MM DD-MM-YYYY");
};
