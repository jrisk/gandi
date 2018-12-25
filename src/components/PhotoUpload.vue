<template>
<div>
<form enctype="multipart/form-data" v-on:submit.prevent="upload()" id="photo-form">
	<div class="row">
      <div class="col-md-4">
        <div class="profile-img" href="#">
          <img src="/public/img/happy.png" alt=""/>
          <div class="file btn btn-lg btn-primary">
            Change Photo
            <input v-on:change="preview()" ref="myFiles" type="file" name="myfile" accept=".jpg, .jpeg, .png" />
          </div>
        </div>
    </div>
	</div>
	<button type="submit">Upload</button>
</form>
</div>
</template>

<script>
import axios_b from '../../url_method.js'

export default {
	data() {
		return {
			file: ''
		}
	},
	methods: {
		preview() {
			const vm = this;
			const instance = axios_b();

			var url = '/file-upload';

			this.file = this.$refs.myFiles.files[0];

			let formdata = new FormData();

			formdata.append('myfile', this.$refs.myFiles.files[0]);

			instance.post(url, formdata, { headers: { 'Content-Type': 'multipart/form-data'} }).then( function(data) {
					console.log(data);
				}).catch(err => console.log(err) );
		}
	}
}
</script>