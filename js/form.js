function addSpaces(initial) {
  return initial.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
}

function validateForm() {
  const x = document.getElementsByClassName("calendar-date--selected");

  if (x.length > 0) {
    const date = document.getElementById("date");
    date.value = x[0].getAttribute("data-calendar-date");

    return true;
  } else {
    const error = document.getElementsByClassName("error")[0];
    error.innerHTML = "Wybierz dzień rozpoczęcia kursu";
    date.value = null;

    return false;
  }
}
