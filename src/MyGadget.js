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
