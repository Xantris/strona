Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
};

var Callendar = {
  month: document.querySelectorAll('[data-calendar-area="month"]')[0],
  next: document.querySelectorAll('[data-calendar-toggle="next"]')[0],
  previous: document.querySelectorAll('[data-calendar-toggle="previous"]')[0],
  label: document.querySelectorAll('[data-calendar-label="month"]')[0],
  activeDates: null,
  avaliableDates: [],
  date: new Date(),
  todaysDate: new Date(),

  init: function(options) {
    this.options = options;
    this.date.setDate(1);
    this.createMonth();
    this.createListeners();
  },

  createListeners: function() {
    var _this = this;
    this.next.addEventListener("click", function() {
      _this.clearCalendar();
      var nextMonth = _this.date.getMonth() + 1;
      _this.date.setMonth(nextMonth);
      _this.createMonth();
    });
    // Clears the calendar and shows the previous month
    this.previous.addEventListener("click", function() {
      _this.clearCalendar();
      var prevMonth = _this.date.getMonth() - 1;
      _this.date.setMonth(prevMonth);
      _this.createMonth();
    });
  },

  createDay: function(num, day, month, year) {
    var newDay = document.createElement("div");
    var dateEl = document.createElement("span");
    dateEl.innerHTML = num;
    newDay.className = "calendar-date";
    newDay.setAttribute(
      "data-calendar-date",
      year + "-" + month.pad(2) + "-" + num.pad(2)
    );

    // if it's the first day of the month
    if (num === 1) {
      if (day === 0) {
        newDay.style.marginLeft = 6 * 14.28 + "%";
      } else {
        newDay.style.marginLeft = (day - 1) * 14.28 + "%";
      }
    }

    if (
      this.options.disablePastDays &&
      this.date.getTime() <= this.todaysDate.getTime() - 1
    ) {
      newDay.classList.add("calendar-date--disabled");
    } else {
      if (
        this.options.avaliableDates.find(element => {
          return element == year + "-" + month.pad(2) + "-" + num.pad(2);
        })
      ) {
        newDay.classList.add("calendar-date--active");
        newDay.setAttribute("data-calendar-status", "active");
        var todayEl = document.createElement("span");
        todayEl.classList = "calendar-date-text";
        todayEl.innerHTML = "Rozpoczęcie kursu";
        newDay.appendChild(dateEl);
        dateEl = todayEl;
      } else {
        newDay.classList.add("calendar-date");
      }
    }

    if (this.date.toString() === this.todaysDate.toString()) {
      newDay.classList.add("calendar-date--today");
      var todayEl = document.createElement("span");
      todayEl.classList = "calendar-date-text";
      todayEl.innerHTML = "Dzisiaj";
      newDay.appendChild(dateEl);
      dateEl = todayEl;
    }

    newDay.appendChild(dateEl);
    this.month.appendChild(newDay);
  },

  dateClicked: function() {
    var _this = this;
    this.activeDates = document.querySelectorAll(
      '[data-calendar-status="active"]'
    );
    for (var i = 0; i < this.activeDates.length; i++) {
      this.activeDates[i].addEventListener("click", function(event) {
        _this.removeActiveClass();
        this.classList.add("calendar-date--selected");
      });
    }
  },

  createMonth: function() {
    var currentMonth = this.date.getMonth();
    while (this.date.getMonth() === currentMonth) {
      this.createDay(
        this.date.getDate(),
        this.date.getDay(),
        this.date.getMonth() + 1,
        this.date.getFullYear()
      );
      this.date.setDate(this.date.getDate() + 1);
    }

    this.date.setDate(1);
    this.date.setMonth(this.date.getMonth() - 1);

    this.label.innerHTML =
      this.monthsAsString(this.date.getMonth()) + " " + this.date.getFullYear();
    this.dateClicked();
  },

  monthsAsString: function(monthIndex) {
    return [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień"
    ][monthIndex];
  },

  clearCalendar: function() {
    Callendar.month.innerHTML = "";
  },

  removeActiveClass: function() {
    for (var i = 0; i < this.activeDates.length; i++) {
      this.activeDates[i].classList.remove("calendar-date--selected");
    }
  }
};
