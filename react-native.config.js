module.exports = {
	dependencies: {
		'react-native-safe-area-context': {
			platforms: {
				android: {
					sourceDir: '../node_modules/react-native-safe-area-context/android',
					packageImportPath: 'import com.th3rdwave.safeareacontext.SafeAreaContextPackage;',
				},
				ios: {},
			},
		},
		microdiff: {
			platforms: {
				android: null, // disable Android platform, other platforms will still autolink
				ios: null, // disable iOS platform, other platforms will still autolink
			},
		},
	},
};
