var StoryTime = function() {

  var _this = this;

  var baseUrl = 'https://www.pivotaltracker.com/services/v5';
  var indicatorCharacter = "✔︎";

  var fetchStories = function() {
    var filters = '/stories?filter=state:started';
    startTimer();
    console.log(_this.token);
    $.ajax({
      url: baseUrl + '/projects/' + extractProjectId() + filters,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-TrackerToken', _this.token);
      }
    }).done(fetchStoriesHistory);
  }

  var fetchStoryHistory = function(id) {
    $.ajax({
      url: baseUrl + '/projects/' + extractProjectId() + '/stories/' + id + '/activity',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-TrackerToken', _this.token);
      }
    }).done(function(data) {
      updateStory(data, id);
    });
  };

  var fetchStoriesHistory = function(data) {
    console.log("fetching stories history");
    for (var i=0; i < data.length;i++) {
      fetchStoryHistory(data[i].id);
    }
  }

  var updateStory = function(data, id) {
    for(var i = 0; i < data.length; i++) {
      if(data[i].highlight == "started") {
        var days = Math.ceil((Date.now() - Date.parse(data[i].occurred_at)) / 86400000);
        updateStoryHtml(id, _this.removeWeekends(days));
        return;
      }
    }
  }

  var updateStoryHtml = function(id, days) {
    var $el = $(".story_" + id + " .story_name");
    var $span = $el.find("span.days_count");
    if($span.size() > 0) {
      $span.text(indicatorText(days));
    } else {
      $("<span class='days_count'>" + indicatorText(days) + " </span>").appendTo($el);
    }
  }

  var indicatorText = function(days) {
    var text = "";
    for(var i = 0; i < days; i++) {
      text += " " + indicatorCharacter;
    }
    return text + " ";
  };

  var startTimer = function () {
    window.setTimeout(fetchStories, 30000);
  };

  var extractProjectId = function() {
    var urlElements = window.location.href.split("/");
    return urlElements[urlElements.length - 1];
  }

  _this.removeWeekends = function(days) {
    var weekDay = (new Date()).getDay();
    if(weekDay == 6) {
      days = days - 1;
      weekDay = weekDay - 1;
    }
    if(weekDay == 7) {
      if(days > 1) {
        days = days - 2;
      }
      else {
        days = days - 1;
      }
      weekDay = weekDay - 2;
    }
    if(weekDay >= days) {
      return days;
    }
    else {
      var daysToLastSunday = days - weekDay;
      var floor = Math.floor(daysToLastSunday / 7);
      var res = daysToLastSunday - (floor * 2);
      var mod = daysToLastSunday % 7;
      if(mod > 1) {
        res = res - 2;
      }
      else if (mod > 0) {
        res = res - 1;
      }
      return res + weekDay;
    }
  }

  _this.run = function() {
    _this.token = localStorage.getItem("api_token");
    if(!_this.token || _this.token == "null") {
      _this.token = prompt("Please enter your Pivotal Tracker API token");
      localStorage.setItem("api_token", token);
    }

    if(_this.token && _this.token != "null") {
      window.setTimeout(fetchStories, 7000);
    }
  }
};

if (typeof exports !== 'undefined') {
  exports.StoryTime = StoryTime;
}
