export default (router,{services,database}) => {
	const { ItemsService } = services;


	router.get('/', (req, res) => res.send('Hello, World!'));

	router.get('/product-list-raw-dbaccess-test', async (req, res) => {
	
		//access the table products in old db way - Directus uses KNEX https://knexjs.org/
		let products = await database('products');
		res.send({data:products});
	});

	router.get('/product-list-item-service-api-test', async (req, res) => {
		//access the products using ItemService
		//this will trigger all flows and hooks attached to this collection

		let productsService = new ItemsService('products',{schema:req.schema,accountability:req.accountability});
		//filter documentation
		//fields is array of fields to return can be * for all
		//for foreign fields use supplier.* to get all fields from supplier of product
		
		let products = await productsService.readByQuery({fields:["id","name"],filter:{}});
		res.send({data:products});

	});

};
