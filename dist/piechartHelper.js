(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * Chart helper.
 * 
 * Enhances tips: [[Module:Piechart]]
 * 
 * History and docs:
 * https://github.com/Eccenux/wikiploy-rollout-example
 * 
 * Deployed using: [[Wikipedia:Wikiploy]]
 */
function PrepChartTitles() {
	this.charts = [];
	this.tips = [];
	this.charts.push('.smooth-pie div[title]');

}

PrepChartTitles.prototype.init = function (el) {
	for (var i = 0; i < this.charts.length; i++) {
		this.prepChart(this.charts[i]);
	}
}

PrepChartTitles.prototype.prepChart = function (selector) {
	var list = document.querySelectorAll(selector);
	for (var i = 0; i < list.length; i++) {
		var el = list[i];
		this.prep(el);
	}
}

PrepChartTitles.prototype.encode = function (text) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
}

PrepChartTitles.prototype.prep = function (el) {
	var title = el.getAttribute('title');
	if (!title.length) {
		return false;
	}
	// sec.
	title = this.encode(title);

	// A PopupWidget
	var popup = new OO.ui.PopupWidget({
		$content: $('<p>' + title + '</p>'),
		//$floatableContainer: $(el),
		$floatableContainer: $(el.parentNode),
		padded: true,
		align: 'center',
		autoFlip: false,
		//width: 300
	});
	// el.parentNode.insertAdjacentElement('afterend', popup.$element[0]);
	document.body.appendChild(popup.$element[0]);
	this.tips.push(popup)

	// action
	el.addEventListener('click', () => {
		console.log({
			title,
			el
		});
		this.tips.forEach(function (tip) {
			tip.toggle(false);
		});
		popup.toggle(true)
	});

	return true;
}

module.exports = { PrepChartTitles }
// var prepChartTitles = new PrepChartTitles();
// prepChartTitles.init();

},{}],2:[function(require,module,exports){
var { PrepChartTitles } = require("./MyGadget");

// instance
var gadget = new PrepChartTitles();

// hook when object is ready
mw.hook('userjs.piechartHelperExample.loaded').fire(gadget);

$(function(){
	// load dependencies
	mw.loader.using("oojs-ui-core, oojs-ui.styles.icons-interactions, oojs-ui.styles.icons-layout".split(/, */)).then( function() {
		mw.hook( 'wikipage.content' ).add( function () {
			gadget.init();
			mw.hook('userjs.piechartHelperExample.preped').fire(gadget);
		} );
		// hook when initial elements are ready 
		mw.hook('userjs.piechartHelperExample.ready').fire(gadget);
	});
});

},{"./MyGadget":1}]},{},[2]);
