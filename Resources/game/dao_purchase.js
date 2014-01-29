var Storekit = require('ti.storekit');

/*
 If you decide to perform receipt verification then you need to indicate if the receipts should be verified
 against the "Sandbox" or "Live" server. If you are verifying auto-renewable subscriptions then you need
 to set the shared secret for the application from your iTunes Connect account.
 */
Storekit.receiptVerificationSandbox = true;

/**
 * Requests a product. Use this to get the information you have set up in iTunesConnect, like the localized name and
 * price for the current user.
 * @param identifier The identifier of the product, as specified in iTunesConnect.
 * @param success A callback function.
 * @return A Ti.Storekit.Product.
 */
function requestProducts(identifierArray) {
	Storekit.requestProducts(identifierArray, function (evt) {
		if (!evt.success) {
			alert('ERROR: We failed to talk to Apple!');
		}
		else if (evt.invalid) {
			alert('ERROR: We requested an invalid product!');
		}
		else {
			//success(evt.products[0]);
			alert(evt.products[0]);
		}
	});
}


//test area
var buzzProducts = ['questionPack1GR','questionPack2GR','questionPack3GR'];
requestProducts(buzzProducts);