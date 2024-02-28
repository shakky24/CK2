export const MAIN_MENU_ITEMS = [{
	id: 1,
	text: 'Overview',
	route: '/dashboard',
	icon: 'chrome_reader_mode'
}, {
	id: 2,
	text: 'Savings Bank',
	route: '/dashboard',
	icon: 'account_box',
	children: [{
		id: 11,
		text: 'Account Info',
		route: '/accounts/info',
		icon: "local_hospital",
		color: "#b5d5c8"
	// }, {
	// 	id: 12,
	// 	text: 'Manage Accounts',
	// 	route: '/accounts/manage',
	// 	icon: "tag_faces",
	// 	color: "#f2ebc0"
	}, {
		id: 13,
		text: 'Account Statement',
		route: '/accounts/statements',
		icon: "tag_faces",
		color: "#f2ebc0"
	}]
}, {
	id: 3,
	text: 'Transfers',
	route: 'dashboard',
	icon: 'payment',
	children: [{
		id: 31,
		text: 'Add Funds',
		route: '/transfers/manage-funds',
		icon: "local_hospital",
		color: "#b5d5c8"
	}, {
		id: 32,
		text: 'Beneficiary list',
		route: '/transfers/beneficiaries',
		icon: "local_hospital",
		color: "#b5d5c8"
	}, {
		id: 33,
		text: 'Send Money',
		route: '/transfers/send-money',
		icon: "local_hospital",
		color: "#b5d5c8"
	}, {
		id: 34,
		text: 'Recieve Money',
		route: '/transfers/receive-money',
		icon: "local_hospital",
		color: "#b5d5c8"
	}]
}, {
	id: 4,
	text: 'Insurance',
	route: 'dashboard',
	icon: 'beach_access',
	children: [{
		id: 41,
		text: 'Recommended Plans',
		route: '/insurance/plans',
		icon: "local_hospital",
		color: "#b5d5c8"
	}, {
		id: 42,
		text: 'Buy Health Insurance',
		route: '/insurance/buy',
		icon: "local_hospital",
		color: "#b5d5c8"
	}, {
		id: 43,
		text: 'Renew Health Insurance',
		route: '/insurance/renew',
		icon: "local_hospital",
		color: "#b5d5c8"
	}, {
		id: 44,
		text: 'Manage Insurances',
		route: '/insurance/manage',
		icon: "local_hospital",
		color: "#b5d5c8"
	}]
}, {
	id: 5,
	text: 'Support',
	route: '/support',
	icon: 'supervisor_account',
	children: [{
		id: 51,
		text: 'Help',
		route: '/support/help',
		icon: "local_hospital",
		color: "#b5d5c8"
	}, {
		id: 52,
		text: 'Customer care',
		route: '/support/care',
		icon: "local_hospital",
		color: "#b5d5c8"
	}]
// }, {
// 	id: 6,
// 	text: 'Log Off',
// 	route: '/log-off',
// 	icon: 'supervisor_account'
}];
