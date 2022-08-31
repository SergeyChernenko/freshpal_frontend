<template>
<div style="width: 100%;">

<div id="img_upload_div" style="display: none">
    <div class="div_img_show border_st">
        <div v-for="item, index in image_list" :key="index">
            <img :src="item" class="imd-show public_status" v-on:click="remove_img(index)" @error="replaceByDefault"/>
        </div>
    </div>
</div>
<div class="main_div">
  <img v-if="username_id != null" class="img_input_m" :src="$hostname+'/media/profile/'+username_id+'/'+username_id+'.png'">
  <div class="wrapper_input" @paste="pasteFunction">

        <textarea-autosize
          :placeholder="description"
          class="input_mes"
          v-model="message"
          :min-height="30"
          :max-height="300"
          :maxlength ="limit"
          v-on:input="lineCount"
         />
    <emoji-picker @emoji="append" :search="emoji_mes">
      <button
        class="emoji-invoker"
        slot="emoji-invoker"
        slot-scope="{ events: { click: clickEvent } }"
        @click.stop="clickEvent"
      >

            <p><span class="select">&#128512;</span></p>

      </button>

      <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
        <div class="emoji-picker" :style="{left: display.x-680 + 'px'}">
          <div style="margin-bottom: 10px" class="emoji-picker__search">
            <input class="input_style"  type="text" v-model="emoji_mes" v-focus>
          </div>
          <div>
            <div v-for="(emojiGroup, category) in emojis" :key="category">
              <h5>{{ category }}</h5>
              <div class="emojis">
                <span
                  v-for="(emoji, emojiName) in emojiGroup"
                  :key="emojiName"
                  @click="insert(emoji)"
                  :title="emojiName"
                >{{ emoji }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </emoji-picker>
  </div>

</div>



<div class="parent">
    <div style="margin: 8px 15px 0px 0px" v-if="message != null">
        <span v-if="message.length <= 400" class="message-counter">{{ message.length}} / {{limit}}</span>
    </div>
    <a style="cursor: pointer" v-on:click="image_but"><img width="20" height="20" class="icon_image" :src="$hostname+'/media/image.svg'"></a>
    <button v-if="edit == false" class="button_style child-active_send" style="height: 40px; width: 110px;" v-on:click="send">Отправить</button>
</div>
<div v-if="edit == true" class="parent">
    <button v-if="image_list.length > 0 || message.length > 0" class="button_style but_input_m child-active" v-on:click="save_edit_mess">Сохранить</button>
    <button class="button_style_cancel but_input_m " v-on:click="cancel_edit_mess">Отмена</button>
</div>

<input style="display: none;" type="file" accept="image/png, image/gif, image/jpeg" multiple="multiple" @change="image_check" class="form-control-file" id="my-file" ref="fileInput">



</div>
</template>

<script>
  import Vue from 'vue'
  import EmojiPicker from 'vue-emoji-picker'
  import TextareaAutosize from 'vue-textarea-autosize'
  Vue.use(TextareaAutosize)

  Vue.use(EmojiPicker)
    export default {
        name: "Emoji",
      components: {
        EmojiPicker

    },
        data() {
            return {
              message: '',
              emoji_mes: '',
              image_list: [],
              limit: 400,
            }
          },
          methods: {

            lineCount() {
                 var line =  this.message.length ? this.message.split(/\r\n|\r|\n/).length : 0
                 if(line > 25){
                     this.message = this.message.slice(0, -1);
                 }
            },

            pasteFunction(pasteEvent){
                if (this.image_list.length < 5) {
                    var items = pasteEvent.clipboardData.items;
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].type.indexOf("image") == -1) continue;
                        var blob = items[i].getAsFile();
                        const img = new Image(),
                            reader = new FileReader();
                        if (reader != null){
                            document.getElementById("img_upload_div").style.display = "block"
                        }
                        reader.onload = (e) => this.image_list.push(e.target.result);

                        reader.readAsDataURL(blob);
                    }
                }
              else {
                  alert('На одну публикацию до 5 файлов!')
              }

            },

            replaceByDefault(event) {
              var input = event.target
              var broken_image = input.getAttribute("src")
              alert('Изображении повреждено')
              this.timeout(broken_image)
            },

            timeout(broken_image){
                if ( this.image_list.includes(broken_image) == true ) {
                    this.image_list = this.image_list.filter(function(f) { return f !== broken_image })
                } else {
                    setTimeout( this.timeout, 100);
                }
            },

            get_image(){

                for (var i = 0; i < this.images.length; i++){
                    this.getBase64Image(this.images[i])
                }
                if (this.images.length > 0){
                    setTimeout(() => document.getElementById("img_upload_div").style.display = "block", 500);
                }
            },

            getBase64Image(url){
              const img = new Image();
              img.setAttribute('crossOrigin', 'anonymous');
              img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                const dataURL = canvas.toDataURL("image/png");
                this.image_list.push(dataURL)
              }
              img.src = url
            },

            remove_img(index){
                this.image_list.splice(index, 1);
                if (this.image_list.length == 0){
                    document.getElementById("img_upload_div").style.display = "none";
                    this.image_list = []
                }

            },

            image_but(){
              this.$refs.fileInput.click()
            },

            image_check(event){
              var files = event.target.files.length
              if (this.image_list.length + files < 6) {
                  let format = ["png", "PNG", "jpeg", "JPEG", "jpg", "JPG"];
                  var input = event.target;
                  var file_name = input.files[0].name;
                  file_name = file_name.split('.')
                  file_name = file_name[file_name.length - 1]
                  for (var i = 0; i < format.length; i++) {
                      if (format[i] == file_name) {
                          this.previewMultiImage(event)
                      }
                  }
              }
              else {
                  alert('На одну публикацию до 5 файлов!')
              }
            },

            previewMultiImage(event) {

              document.getElementById("img_upload_div").style.display = "block";
              var input = event.target
              var count = input.files.length;
              var index = 0;
              if (input.files) {
                while(count --) {
                  var reader = new FileReader();
                  reader.onload = (e) => {
                    this.image_list.push(e.target.result);
                  }
                  // this.image_list.push(input.files[index]);
                  reader.readAsDataURL(input.files[index]);
                  index ++;
                }
              }
            },

            save_edit_mess(){

              this.$emit('save_edit', this.message, this.image_list);
              this.image_list = []
              document.getElementById("img_upload_div").style.display = "none";
            },

            cancel_edit_mess(){
              this.$emit('cancel_edit');
              this.image_list = []
              document.getElementById("img_upload_div").style.display = "none";
            },

            send(){
              this.$emit('message', this.message, this.image_list);
              this.message = ''
              this.image_list = []
              document.getElementById("img_upload_div").style.display = "none";

            },

            append(emoji) {
              this.message += emoji
            },

          },
      props: {
        description: String,
        username_id: Number,
        edit: Boolean,
        message_edit: String,
        images: Array,
      },
          directives: {
            focus: {
              inserted(el) {
                el.focus()
              },
            },
          },
      created(){

          this.message = this.message_edit
          if (this.edit == true){
              this.get_image()
          }
      }
    }
</script>

<style scoped>

.main_div{
  display: flex;
  width: 100%;
}



.regular-input {
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: 1px solid #191919;
  width: 20rem;
  height: 12rem;
  outline: none;
}

.regular-input:focus {
  box-shadow: 0 0 0 3px rgba(66,153,225,.5);
}



.parent {
  display: flex;
  flex-wrap: wrap;


  justify-content: flex-end;
}
.child-active {
  flex-basis: 30%;
}
.child-active_send {
  flex-basis: 20%;
}

.textarea-container {
  position: relative;
}
.textarea-container textarea {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.textarea-container button {
  position: absolute;
  top: 0;
  right: 0;
}

.imd-show{
  max-width: 500px;
  max-height: 180px;
  margin: 10px;
  border-radius: 20px;
}

.div_img_show{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px
}

.icon_image{
    margin: 10px 15px 0px 0px;
}

</style>