function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}
function _typeof(o) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (o) {
            return typeof o;
          }
        : function (o) {
            return o &&
              "function" == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? "symbol"
              : typeof o;
          }),
    _typeof(o)
  );
}
function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}
function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (
    (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) ||
    iter["@@iterator"] != null
  )
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var Douban = /*#__PURE__*/ (function () {
  "use strict";

  function Douban(config) {
    var _config$types;
    _classCallCheck(this, Douban);
    this.container = config.container;
    this.types =
      (_config$types = config.types) !== null && _config$types !== void 0
        ? _config$types
        : ["movie", "book", "music", "game", "drama"];
    this.baseAPI = config.baseAPI;
    this.ver = "1.0.6";
    this.type = "movie";
    this.status = "done";
    this.finished = false;
    this.paged = 1;
    this.genre_list = [
      {
        name: "已看",
        value: "done",
      },
      {
        name: "在看",
        value: "doing",
      },
      {
        name: "想看",
        value: "mark",
      },
    ];
    this.subjects = [];
    this._create();
  }
  return _createClass(Douban, [
    {
      key: "on",
      value: function on(event, element, callback) {
        var nodeList = document.querySelectorAll(element);
        nodeList.forEach(function (item) {
          item.addEventListener(event, callback);
        });
      },
    },
    {
      key: "_handleGenreClick",
      value: function _handleGenreClick() {
        var _this = this;
        this.on("click", ".db--genreItem", function (t) {
          var self = t.currentTarget;
          if (self.classList.contains("is-active")) {
            return;
          }
          document.querySelector(".db--list").innerHTML = "";
          document.querySelector(".lds-ripple").classList.remove("u-hide");
          _this.status = self.dataset.status || ""; // Provide a default value of an empty string if self.dataset.status is undefined
          _this._renderGenre();
          _this.paged = 1;
          _this.finished = false;
          _this.subjects = [];
          _this._fetchData();
        });
      },
    },
    {
      key: "_reanderTypes",
      value: function _reanderTypes() {
        var _this2 = this;
        document.querySelector(".db--nav").innerHTML = this.types
          .map(function (item) {
            return '<span class="db--navItem JiEun'
              .concat(_this2.type == item ? " current" : "", '" data-type="')
              .concat(item, '">')
              .concat(item, "</span>");
          })
          .join("");
        this._handleNavClick();
      },
    },
    {
      key: "_renderGenre",
      value: function _renderGenre() {
        var _this3 = this;
        document.querySelector(".db--genres").innerHTML = this.genre_list
          .map(function (item) {
            return '<span class="db--genreItem'
              .concat(
                _this3.status == item.value ? " is-active" : "",
                '" data-status="'
              )
              .concat(item.value, '">')
              .concat(item.name, "</span>");
          })
          .join("");
        this._handleGenreClick();
      },
    },
    {
      key: "_fetchData",
      value: function _fetchData() {
        var _this4 = this;
        var params = new URLSearchParams({
          paged: this.paged.toString(),
          type: this.type,
          status: this.status,
        });
        fetch(this.baseAPI + "list?" + params.toString())
          .then(function (response) {
            return response.json();
          })
          .then(function (t) {
            console.log(t.results);
            if (t.results.length) {
              if (
                document
                  .querySelector(".db--list")
                  .classList.contains("db--list__card")
              ) {
                _this4.subjects = [].concat(
                  _toConsumableArray(_this4.subjects),
                  _toConsumableArray(t.results)
                );
                _this4._randerDateTemplate();
              } else {
                _this4.subjects = [].concat(
                  _toConsumableArray(_this4.subjects),
                  _toConsumableArray(t.results)
                );
                _this4._randerListTemplate();
              }
              document.querySelector(".lds-ripple").classList.add("u-hide");
            } else {
              _this4.finished = true;
              document.querySelector(".lds-ripple").classList.add("u-hide");
            }
          });
      },
    },
    {
      key: "_randerDateTemplate",
      value: function _randerDateTemplate() {
        var result = this.subjects.reduce(function (result, item) {
          var date = new Date(item.create_time);
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var key = ""
            .concat(year, "-")
            .concat(month.toString().padStart(2, "0"));
          if (Object.prototype.hasOwnProperty.call(result, key)) {
            result[key].push(item);
          } else {
            result[key] = [item];
          }
          return result;
        }, {});
        var html = "";
        for (var key in result) {
          var date = key.split("-");
          html +=
            '<div class="db--listBydate"><div class="db--titleDate"><div class="db--titleDate__day">'
              .concat(date[1], '</div><div class="db--titleDate__month">')
              .concat(date[0], '</div></div><div class="db--dateList__card">');
          html += result[key]
            .map(function (movie) {
              return '<div class="db--item">'
                .concat(
                  movie.is_top250 ? '<span class="top250">Top 250</span>' : "",
                  '<img src="'
                )
                .concat(
                  movie.poster,
                  '" referrerpolicy="no-referrer" class="db--image"><div class="db--score ">'
                )
                .concat(
                  movie.douban_score > 0
                    ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" ><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>' +
                        movie.douban_score
                    : ""
                )
                .concat(
                  movie.year > 0 ? " · " + movie.year : "",
                  '</div><div class="db--title"><a href="'
                )
                .concat(movie.link, '" target="_blank">')
                .concat(movie.name, "</a></div></div>");
            })
            .join("");
          html += "</div></div>";
        }
        document.querySelector(".db--list").innerHTML = html;
      },
    },
    {
      key: "_randerListTemplate",
      value: function _randerListTemplate() {
        document.querySelector(".db--list").innerHTML = this.subjects
          .map(function (item) {
            return '<div class="db--item"><img src="'
              .concat(
                item.poster,
                '" referrerpolicy="no-referrer" class="db--image"><div class="ipc-signpost ">'
              )
              .concat(item.create_time, '</div><div class="db--score ">')
              .concat(
                item.douban_score
                  ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" ><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>' +
                      item.douban_score
                  : ""
              )
              .concat(
                item.year ? " · " + item.year : "",
                '</div><div class="db--title"><a href="'
              )
              .concat(item.link, '" target="_blank">')
              .concat(
                item.name,
                "</a></div>\n                </div>\n                </div>"
              );
          })
          .join("");
      },
    },
    {
      key: "_handleScroll",
      value: function _handleScroll() {
        var _this5 = this;
        window.addEventListener("scroll", function () {
          var t = window.scrollY || window.pageYOffset;
          var moreElement = document.querySelector(".block-more");
          if (
            moreElement.offsetTop + -window.innerHeight < t &&
            document
              .querySelector(".lds-ripple")
              .classList.contains("u-hide") &&
            !_this5.finished
          ) {
            document.querySelector(".lds-ripple").classList.remove("u-hide");
            _this5.paged++;
            _this5._fetchData();
          }
        });
      },
    },
    {
      key: "_handleNavClick",
      value: function _handleNavClick() {
        var _this6 = this;
        this.on("click", ".db--navItem", function (t) {
          var self = t.currentTarget;
          if (self.classList.contains("current")) return;
          _this6.status = "done";
          _this6.type = self.dataset.type;
          _this6._renderGenre();
          document.querySelector(".db--list").innerHTML = "";
          document.querySelector(".lds-ripple").classList.remove("u-hide");
          document
            .querySelector(".db--navItem.current")
            .classList.remove("current");
          self.classList.add("current");
          _this6.paged = 1;
          _this6.finished = false;
          _this6.subjects = [];
          _this6._fetchData();
        });
      },
    },
    {
      key: "_create",
      value: function _create() {
        var _this7 = this;
        if (document.querySelector(".db--container")) {
          var container = document.querySelector(this.container);
          if (!container) return;
          container.innerHTML =
            '<nav class="db--nav">\n            </nav>\n            <div class="db--genres">\n            </div>\n            <div class="db--list db--list__card">\n            </div>\n            <div class="block-more block-more__centered">\n                <div class="lds-ripple">\n                </div>\n            </div>';
          this._renderGenre();
          this._reanderTypes();
          this._fetchData();
          this._handleScroll();
        }
        if (document.querySelector(".js-db")) {
          document.querySelectorAll(".js-db").forEach(function (item) {
            var db = item;
            var id = db.dataset.id;
            var type = db.dataset.type;
            var nodeParent = db.parentNode;
            fetch(_this7.baseAPI + "".concat(type, "/").concat(id)).then(
              function (response) {
                response.json().then(function (t) {
                  if (t.data) {
                    var data = t.data;
                    var node = document.createElement("div");
                    node.classList.add("doulist-item");
                    node.innerHTML =
                      '<div class="doulist-subject">\n                            <div class="doulist-post"><img decoding="async" referrerpolicy="no-referrer" src="'
                        .concat(
                          data.poster,
                          '"></div>\n                            <div class="doulist-content">\n                            <div class="doulist-title"><a href="'
                        )
                        .concat(
                          data.link,
                          '" class="cute" target="_blank" rel="external nofollow">'
                        )
                        .concat(
                          data.name,
                          '</a></div>\n                            <div class="rating"><span class="allstardark"><span class="allstarlight" style="width:55%"></span></span><span class="rating_nums"> '
                        )
                        .concat(
                          data.douban_score,
                          ' </span></div>\n                            <div class="abstract">'
                        )
                        .concat(
                          data.card_subtitle,
                          "</div>\n                            </div>\n                            </div>"
                        );
                    nodeParent.replaceWith(node);
                  }
                });
              }
            );
          });
        }
        if (document.querySelector(".db--collection")) {
          document.querySelectorAll(".db--collection").forEach(function (item) {
            _this7._fetchCollection(item);
          });
        }
      },
    },
    {
      key: "_fetchCollection",
      value: function _fetchCollection(item) {
        var type = item.dataset.style ? item.dataset.style : "card";
        fetch(
          this.baseAPI +
            "/list?type=" +
            item.dataset.type +
            "&paged=1&start_time=" +
            item.dataset.start +
            "&end_time=" +
            item.dataset.end
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (t) {
            if (t.length) {
              if (type == "card") {
                item.innerHTML += t
                  .map(function (movie) {
                    return '<div class="doulist-item">\n                            <div class="doulist-subject">\n                            <div class="db--viewTime ">Marked '
                      .concat(
                        movie.create_time,
                        '</div>\n                            <div class="doulist-post"><img referrerpolicy="no-referrer" src="'
                      )
                      .concat(
                        movie.poster,
                        '"></div><div class="doulist-content"><div class="doulist-title"><a href="'
                      )
                      .concat(
                        movie.link,
                        '" class="cute" target="_blank" rel="external nofollow">'
                      )
                      .concat(
                        movie.name,
                        '</a></div><div class="rating"><span class="allstardark"><span class="allstarlight" style="width:75%"></span></span><span class="rating_nums">'
                      )
                      .concat(
                        movie.douban_score,
                        '</span></div><div class="abstract">'
                      )
                      .concat(movie.card_subtitle, "</div></div></div></div>");
                  })
                  .join("");
              } else {
                var result = t.reduce(function (result, item) {
                  if (
                    Object.prototype.hasOwnProperty.call(
                      result,
                      item.create_time
                    )
                  ) {
                    result[item.create_time].push(item);
                  } else {
                    result[item.create_time] = [item];
                  }
                  return result;
                }, {});
                var html = "";
                for (var key in result) {
                  html += '<div class="db--date">'.concat(
                    key,
                    '</div><div class="db--dateList">'
                  );
                  html += result[key]
                    .map(function (movie) {
                      return '<div class="db--card__list"">\n                                    <img referrerpolicy="no-referrer" src="'
                        .concat(
                          movie.poster,
                          '">\n                                    <div>\n                                    <div class="title"><a href="'
                        )
                        .concat(
                          movie.link,
                          '" class="cute" target="_blank" rel="external nofollow">'
                        )
                        .concat(
                          movie.name,
                          '</a></div>\n                                    <div class="rating"><span class="allstardark"><span class="allstarlight" style="width:75%"></span></span><span class="rating_nums">'
                        )
                        .concat(
                          movie.douban_score,
                          "</span></div>\n                                    "
                        )
                        .concat(
                          movie.remark || movie.card_subtitle,
                          "\n                                    </div>\n                                    </div>"
                        );
                    })
                    .join("");
                  html += "</div>";
                }
                item.innerHTML = html;
              }
            }
          });
      },
    },
  ]);
})();
