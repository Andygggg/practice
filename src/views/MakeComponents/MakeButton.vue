<template>
  <button :class="props.btn_class" role="button">
    <span class="text">
      <slot>button</slot>
    </span>
  </button>
</template>

<script setup>
const props = defineProps({
  btn_class: {
    type: String,
    default() {
      return 'button_rgb'
    },
    require: true,
  },
})
</script>

<style scoped>
.text {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
button:disabled {
  background-color: gray !important;
  color: #ffffff !important;
  border: none !important;
  cursor: not-allowed;
}
/* rgb */
.button_rgb {
  align-items: center;
  background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
  border: 0;
  border-radius: 8px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  font-family: Phantomsans, sans-serif;
  justify-content: center;
  line-height: 1em;
  max-width: 100%;
  padding: 3px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
}

.button_rgb:active,
.button_rgb:hover {
  outline: 0;
}

.button_rgb span {
  background-color: rgb(5, 6, 45);
  padding: 12px 24px;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  transition: 300ms;
}

.button_rgb:hover span {
  background: none;
}

/* blue */
.btn_blue {
  background-color: #0095ff;
  border: 1px solid transparent;
  border-radius: 5px;
  box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, 'Segoe UI', 'Liberation Sans', sans-serif;
  font-weight: 600;
  line-height: 1.15385;
  margin: 0;
  outline: none;
  padding: 8px 0.8em;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;
}

.btn_blue:hover {
  background-color: rgb(255, 255, 255);
  border: 1px solid #0095ff;
  color: #0095ff;
}

/* red */
.btn_red {
  background-color: #ff0000;
  border: 1px solid transparent;
  border-radius: 5px;
  box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, 'Segoe UI', 'Liberation Sans', sans-serif;
  font-weight: 600;
  line-height: 1.15385;
  margin: 0;
  outline: none;
  padding: 8px 0.8em;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;
}

.btn_red:hover {
  background-color: rgb(255, 255, 255);
  border: 1px solid #ff0000;
  color: #ff0000;
}

/* green */
.btn_green {
  background-color: #2b9900;
  border: 1px solid transparent;
  border-radius: 5px;
  box-shadow: rgba(255, 255, 255, 0.4) 0 1px 0 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, 'Segoe UI', 'Liberation Sans', sans-serif;
  font-weight: 600;
  line-height: 1.15385;
  margin: 0;
  outline: none;
  padding: 8px 0.8em;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;
}

.btn_green:hover {
  background-color: rgb(255, 255, 255);
  border: 1px solid #2b9900;
  color: #2b9900;
}
</style>
