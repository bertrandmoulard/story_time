var jas = require('jasmine-node');
var _ = require('underscore-node');
var st = require("../story_time.js");

describe("StoryTime", function() {

  var storyTime = new st.StoryTime();
  describe("#removeWeekends", function() {
    xdescribe("when it's a Monday", function() {

      beforeEach(function() {
        spyOn(Date.prototype, 'getDay').andReturn(1);
      });

      var cases = [
        {days: 1, remove: 0},
        {days: 2, remove: 1},
        {days: 3, remove: 2},
        {days: 4, remove: 2},
        {days: 5, remove: 2},
        {days: 6, remove: 2},
        {days: 7, remove: 2},
        {days: 8, remove: 2},
        {days: 9, remove: 3},
        {days: 10, remove: 4},
        {days: 11, remove: 4},
        {days: 12, remove: 4},
        {days: 13, remove: 4},
        {days: 14, remove: 4},
        {days: 15, remove: 4},
        {days: 16, remove: 5},
        {days: 17, remove: 6},
        {days: 18, remove: 6},
        {days: 19, remove: 6},
        {days: 20, remove: 6}
      ];

      _(cases).each(function (caseData) {
        describe("and the ticket was started " + caseData.days + " days ago", function() {
          it("should remove " + caseData.remove + " day(s)", function() {
            expect(storyTime.removeWeekends(caseData.days)).toBe(caseData.days - caseData.remove);
          });
        });
      });
    });

    xdescribe("when it's a Wednesday", function() {

      beforeEach(function() {
        spyOn(Date.prototype, 'getDay').andReturn(3);
      });

      var cases = [
        {days: 1, remove: 0},
        {days: 2, remove: 0},
        {days: 3, remove: 0},
        {days: 4, remove: 1},
        {days: 5, remove: 2},
        {days: 6, remove: 2},
        {days: 7, remove: 2},
        {days: 8, remove: 2},
        {days: 9, remove: 2},
        {days: 10, remove: 2},
        {days: 11, remove: 3},
        {days: 12, remove: 4},
        {days: 13, remove: 4},
        {days: 14, remove: 4},
        {days: 17, remove: 4},
        {days: 18, remove: 5},
        {days: 19, remove: 6},
        {days: 20, remove: 6}
      ];

      _(cases).each(function (caseData) {
        describe("and the ticket was started " + caseData.days + " days ago", function() {
          it("should remove " + caseData.remove + " day(s)", function() {
            expect(storyTime.removeWeekends(caseData.days)).toBe(caseData.days - caseData.remove);
          });
        });
      });
    });

    xdescribe("when it's a Friday", function() {

      beforeEach(function() {
        spyOn(Date.prototype, 'getDay').andReturn(5);
      });

      var cases = [
        {days: 1, remove: 0},
        {days: 2, remove: 0},
        {days: 3, remove: 0},
        {days: 4, remove: 0},
        {days: 5, remove: 0},
        {days: 6, remove: 1},
        {days: 7, remove: 2},
        {days: 8, remove: 2},
        {days: 9, remove: 2},
        {days: 10, remove: 2},
        {days: 11, remove: 2},
        {days: 12, remove: 2},
        {days: 13, remove: 3},
        {days: 14, remove: 4},
        {days: 17, remove: 4},
        {days: 18, remove: 4},
        {days: 19, remove: 4},
        {days: 20, remove: 5},
        {days: 21, remove: 6}
      ];

      _(cases).each(function (caseData) {
        describe("and the ticket was started " + caseData.days + " days ago", function() {
          it("should remove " + caseData.remove + " day(s)", function() {
            expect(storyTime.removeWeekends(caseData.days)).toBe(caseData.days - caseData.remove);
          });
        });
      });
    });

    describe("when it's a Saturday", function() {

      beforeEach(function() {
        spyOn(Date.prototype, 'getDay').andReturn(6);
      });

      var cases = [
        {days: 1, remove: 1},
        {days: 2, remove: 1},
        {days: 3, remove: 1},
        {days: 4, remove: 1},
        {days: 5, remove: 1},
        {days: 6, remove: 1},
        {days: 7, remove: 2},
        {days: 8, remove: 3},
        {days: 9, remove: 3},
        {days: 10, remove: 3},
        {days: 11, remove: 3},
        {days: 12, remove: 3},
        {days: 13, remove: 3},
        {days: 14, remove: 4},
        {days: 17, remove: 5},
        {days: 18, remove: 5},
        {days: 19, remove: 5},
        {days: 20, remove: 5},
        {days: 21, remove: 6},
        {days: 22, remove: 7},
        {days: 23, remove: 7}
      ];

      _(cases).each(function (caseData) {
        describe("and the ticket was started " + caseData.days + " days ago", function() {
          it("should remove " + caseData.remove + " day(s)", function() {
            expect(storyTime.removeWeekends(caseData.days)).toBe(caseData.days - caseData.remove);
          });
        });
      });
    });

    describe("when it's a Sunday", function() {

      beforeEach(function() {
        spyOn(Date.prototype, 'getDay').andReturn(7);
      });

      var cases = [
        {days: 1, remove: 1},
        {days: 2, remove: 2},
        {days: 3, remove: 2},
        {days: 4, remove: 2},
        {days: 5, remove: 2},
        {days: 6, remove: 2},
        {days: 7, remove: 2},
        {days: 8, remove: 3},
        {days: 9, remove: 4},
        {days: 10, remove: 4},
        {days: 11, remove: 4},
        {days: 12, remove: 4},
        {days: 13, remove: 4},
        {days: 14, remove: 4},
        {days: 15, remove: 5},
        {days: 16, remove: 6},
        {days: 17, remove: 6},
        {days: 18, remove: 6},
        {days: 19, remove: 6},
        {days: 20, remove: 6},
        {days: 21, remove: 6},
        {days: 22, remove: 7},
        {days: 23, remove: 8}
      ];

      _(cases).each(function (caseData) {
        describe("and the ticket was started " + caseData.days + " days ago", function() {
          it("should remove " + caseData.remove + " day(s)", function() {
            expect(storyTime.removeWeekends(caseData.days)).toBe(caseData.days - caseData.remove);
          });
        });
      });
    });
  });
});
