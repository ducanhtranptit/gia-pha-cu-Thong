import moment from "moment";

export const formatTime = (time, options = {}) => {
  if (options.onlyDate) {
    return moment(time).format("DD/MM/YYYY");
  }
  return moment(time).format("DD/MM/YYYY HH:MM");
};
