(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * Chart helper.
 * 
 * Enhances tips: [[Module:Piechart]]
 * 
 * History and docs:
 * https://github.com/Eccenux/css-piechart-script
 * 
 * Deployed using: [[Wikipedia:Wikiploy]]
 */
function PrepChartTitles() {
	this.charts = [];
	this.tips = [];
	this.charts.push({parent:'.smooth-pie', items:'.smooth-pie div[title]'});

}

PrepChartTitles.prototype.init = function (el) {
	for (var i = 0; i < this.charts.length; i++) {
		this.prepChart(this.charts[i]);
	}
}

/** Prepare all chart elements. */
PrepChartTitles.prototype.prepChart = function (chart) {
	var list = document.querySelectorAll(chart.items);
	// console.log('prep-l', list);
	for (var i = 0; i < list.length; i++) {
		var el = list[i];
		this.prep(el);
	}
	var parents = document.querySelectorAll(chart.parent);
	for (var i = 0; i < parents.length; i++) {
		var el = parents[i];
		this.prep(el, true);
	}
}

/** Simplified htmlspecialchars. */
PrepChartTitles.prototype.encode = function (text) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
	;
}

/** Prepare single slice (or bar). */
PrepChartTitles.prototype.prep = function (el, isParent) {
	var title = el.getAttribute('title');
	if (!title.length) {
		return false;
	}
	// sec.
	title = this.encode(title);

	// A PopupWidget
	var popup = new OO.ui.PopupWidget({
		$content: $('<p>' + title + '</p>'),
		$floatableContainer: isParent ? $(el) : $(el.parentNode),
		padded: true,
		align: 'center',
		autoClose: true,
		width: 100,
	});
	// el.parentNode.insertAdjacentElement('afterend', popup.$element[0]);
	document.body.appendChild(popup.$element[0]);
	this.tips.push(popup)

	// action
	var me = this;
	el.addEventListener('click', function(e) {
		// console.log('click', e.target, {isParent});
		if (!isParent) {
			e.stopPropagation(); // stop bubbling
		}
		me.tips.forEach(function (tip) {
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
