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
