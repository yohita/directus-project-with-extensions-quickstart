import ModuleComponent from './module.vue';

export default {
	id: 'custom-app',
	name: 'App',
	icon: 'rocket_launch',
	routes: [
		{
			name: 'home',
			path: '',
			props: true,
			component: ModuleComponent,
		},
		{
			name: 'page',
			path: ':page',
			props: true,
			component: ModuleComponent,
		},
	],
};