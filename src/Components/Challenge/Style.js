import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 0,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around'
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inner: {
      padding: 10
  },
  after: {
      height: 1,
      flex: 1,
      position: 'absolute',
      left: 0,
      bottom: 0,
      backgroundColor: '#A9A9A9'
  },
  title: {
    marginTop: 0,
    marginBottom: 10,
    fontWeight: '300',
    fontSize: 28
  },
  text: {
    color: '#A9A9A9',
    margin: 0,
    fontWeight: '300',
    fontSize: 15,
  },
  circleText: {
    color: '#fff',
    backgroundColor: 'transparent'
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingLeft: 5
  },
  inputShort: {
    height: 40,
  },
  inputTall: {
    height: 65,
    borderTopWidth: 0
  },
  locationButton: {
    height: 40,
    paddingLeft: 5
  },
  locationButtonText: {
    lineHeight: 40
  },
  formImage: {
    width: 50,
    height: 50
  },
  categoryButton: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0
  },
  categoryButtonText: {
    lineHeight: 38,
    paddingLeft: 5
  },
  categoryButtonValue: {
    paddingRight: 5,
    color: 'gray'
  },
  picker: {
    overflow: 'hidden'
  },
});