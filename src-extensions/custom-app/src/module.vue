
<template>
	<div class="custom-module">
	<private-view> 
	   <iframe :src="customadmin_url" />

 	</private-view>
</div>
</template>

<script>
import { ref} from 'vue';
import { useApi,useStores } from '@directus/extensions-sdk';
import { useRouter } from 'vue-router';
import useDirectusToken from './use-directus-token'; 



export default { 
	setup(props) {
		const router = useRouter();
		const api = useApi();
		const { addTokenToURL } = useDirectusToken(api);
	 
		const { useUserStore } = useStores();
		const userStore = useUserStore(); 
	
		const customadmin_url = ref('');

		customadmin_url.value = `/app`; 
		console.log(customadmin_url.value); 

		return {customadmin_url }; 
	},
	
};
</script>

<style lang="scss">
.custom-module {
	display: contents;
}
.custom-module aside,.custom-module .resize-wrapper{
	display: none;
} 
.custom-module header{
	display: none!important;
}
.custom-module .private-view .module-nav{
    display: none!important;
}

	.lp-container {
		padding: var(--content-padding);
		padding-top: 0;
		width: 100%;
		max-width: 1200px;

		&> div {
			margin-bottom: var(--content-padding);
		}
	}

	.lp-banner {
		border-radius: var(--border-radius);
		overflow: hidden;

		img {
			display: block;
			width: 100%;
		}
	}

	.lp-cards {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		column-gap: var(--input-padding);
    	row-gap: var(--input-padding);

		.lp-card {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			text-align: center;
			border-radius: var(--border-radius);
			padding: var(--input-padding);
			color: white;

			.v-icon {
				width: 100%;
				height: 50px;
				margin-bottom: 6px;

				i {
					font-size: 50px;
    				color: white;
				}
			}

			.lp-card-title {
				display: block;
				font-weight: bold;
				font-size: 1.4em;
				line-height: 1.2;
			}
		}
	}

	iframe{
		width:100%;
		height:99%;
		border: 0;
		background: transparent;
	}
</style>