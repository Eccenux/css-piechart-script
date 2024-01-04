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
