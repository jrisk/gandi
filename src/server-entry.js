import { createApp } from './main.js';

export default context => {
	//async route hooks/components possible,
	//tell server to wait with promise til render

	return new Promise( (resolve,reject) => {
		const { app, router } = createApp();

		//set server-side router location
		router.push(context.url);

		//wait til router resolve async hooks
		router.onReady( () => {
			const matchedComponents = router.getMatchedComponents();
			//no matched routes, reject to 404
			if (!matchedComponents.length) {
				return reject( { code: 404} );
			}

			resolve(app);
		}, reject);
	});
}