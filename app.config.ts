export default defineAppConfig({
  default_theme: 'dark',
  supported_devices: {
    types: [
      {
        name: 'Generic',
        label: 'Generic Joystick'
      },
      {
        name: 'Canvas',
        label: 'Test layout custom'
      },
      {
        name: 'FlightStick',
        label: 'Turtle Beach Velocityone Flightstick'
      }
    ]
  }
})