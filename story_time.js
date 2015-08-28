var fetchStories = function() {
  var filters = '/stories?filter=state:started';
  startTimer();
  $.ajax({
    url: baseUrl + '/projects/' + projectId + filters,
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-TrackerToken', token);
    }
  }).done(fetchStoriesHistory);
}

var fetchStoryHistory = function(id) {
  $.ajax({
    url: baseUrl + '/projects/' + projectId + '/stories/' + id + '/activity',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('X-TrackerToken', token);
    }
  }).done(function(data) { updateStory(data, id)});
};

var fetchStoriesHistory = function(data) {
    for (var i=0; i < data.length;i++) {
      fetchStoryHistory(data[i].id);
    }
}

var updateStory = function(data, id) {
  for(var i = 0; i < data.length; i++) {
    if(data[i].highlight == "started") {
      var days = Math.ceil((Date.now() - Date.parse(data[i].occurred_at)) / 86400000);
      updateStoryHtml(id, removeWeekends(days));
      return;
    }
  }
}

var removeWeekends = function(days) {
  var weekDay = (new Date()).getDay();
  if(weekDay >= days) {
    return days;
  }
  else {
    days = days - (Math.floor(days/7) * 2);
    return days;
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
    text += " ✔︎";
  }
  return text + " ";
};

var startTimer = function () {
  window.setTimeout(fetchStories, 30000);
};

var isTrackerProjectPage = function() {
  return (window.location.href.indexOf("www.pivotaltracker.com/n/projects/") > -1);
}

var baseUrl = 'https://www.pivotaltracker.com/services/v5';

if(isTrackerProjectPage()) {
  var urlElements = window.location.href.split("/");
  var projectId = urlElements[urlElements.length - 1];
  var token = localStorage.getItem("api_token");
  if(!token || token == "null") {
    token = prompt("Please enter your Pivotal Tracker API token");
    localStorage.setItem("api_token", token);
  }

  if(token && projectId && token != "null" && projectId != "null") {
    window.setTimeout(fetchStories, 7000);
  }
}
