export default {
  props: {},

  data() {},

  methods: {
    saveAsFile(data, defaultFilename) {
      const element = document.createElement("a")
      element.setAttribute("href", "data:text/plain," + encodeURIComponent(data))
      element.setAttribute("download", defaultFilename)
      
      element.style.display = "none"
      document.body.appendChild(element)

      element.click()

      document.body.removeChild(element)
    }
  }
}