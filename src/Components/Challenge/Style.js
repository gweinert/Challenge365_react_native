import { StyleSheet, Dimensions } from 'react-native';

var { height, width } = Dimensions.get('window')

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    width: width - 50,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
  },
  bg: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',

  },
  
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'transparent',
  },

  topInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  dotSpacer: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: '#fff',
    marginLeft: 6,
    marginRight: 6,

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
    color: '#fff',    
    marginTop: 0,
    marginBottom: 10,
    fontWeight: '300',
    fontSize: 28,
    backgroundColor: 'transparent',
  },
  text: {
    color: '#fff',
    margin: 0,
    fontWeight: '500',
    fontSize: 14,
    backgroundColor: 'transparent',    
  },
  circleText: {
    color: '#fff',
    backgroundColor: 'transparent'
  },
  bottom: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  voteContainer: {
    marginRight: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
    backgroundColor: '#fff',
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 4,
      width: -3
    },

  },
  input: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    paddingLeft: 5,
    color: '#000',
    marginBottom: 20,
    
  },
  inputShort: {
    height: 40,
  },
  inputTall: {
    height: 65,
    borderTopWidth: 0,
    fontSize: 16,
  },
  locationButton: {
    height: 40,
    paddingLeft: 5,
    borderColor: 'grey',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  locationButtonText: {
    lineHeight: 39,
    color: 'grey',
    fontSize: 16,
  },
  formImage: {
    width: 50,
    height: 50
  },
  imagePickerContainer: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingBottom: 10,
  },
  imageIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginTop: 20,
  },
  categoryButton: {
    flex: 0,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  categoryButtonText: {
    lineHeight: 38,
    paddingLeft: 5,
    fontSize: 16,
    color: 'gray'
  },
  categoryButtonValue: {
    paddingRight: 15,
    fontSize: 16,
    color: 'gray',
  },
  afterDropdown: {
    position: 'absolute',
    color: 'grey',
    right: 0,
  },
  picker: {
    overflow: 'hidden'
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#2ebaee',
    height: 50,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 50,
    fontSize: 16,
  }
});