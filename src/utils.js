const format = {
  dateToTimeString: (dateStr) => new Date(dateStr).toLocaleTimeString().substr(0, 5)
}

export { format };