export default defineAppConfig({
  default_theme: 'dark',
  itemPerPage: 25,
  supported_devices: {
    types: [
      {
        name: 'Generic',
        label: 'Generic Joystick'
      },
      {
        name: 'Canvas',
        label: 'Editor Layout'
      },
      {
        name: 'FlightStick',
        label: 'CUSTOM - Turtle Beach Velocityone Flightstick'
      }
    ]
  }
})