import React, {Component} from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { DraggableCalendar } from "react-native-draggable-calendar";

export class DragCalendar extends Component {

    constructor(props) {
      super(props);
    }
  
    onGetTime = () => {
      // you can get the selected time.
      console.log('onGetTime: ', this._calendar.getSelection());
    };
  
    onSelectionChange = (newSelection) => {
      // when selected time changes, this func will be called.
      console.log('onSelectionChange', newSelection);
    };
  
    render() {
      return (
        <View style={{flex: 1}}>
          <DraggableCalendar
            ref={_ => this._calendar = _}
            onSelectionChange={this.onSelectionChange}
          />
          <TouchableOpacity onPress={this.onGetTime} style={{
            justifyContent: 'center', alignItems: 'center',
            left: 0, right: 0, bottom: 0, paddingVertical: 15,
            position: 'absolute', backgroundColor: '#4291EF'
          }}>
            <Text style={{color: '#FFF'}}>Get Time</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }