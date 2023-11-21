import * as React from 'react';
import * as RN from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


class OtherTimeSHeet extends React.Component {
    months = ["Gennaio", "Febbraio", "Marzo", "Aprile",
        "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre",
        "Novembre", "Dicembre"
    ];


    //METODO CHE EVIDENZIA IL GIORNO SELEZIONATO SETTANDO IL FONTWEIGHT = BOLD
    //AL MOMENTO INUTILE, DA SOSTITUIRE CON POP-UP PER AGGIUNGERE I TASKS
    // _onPress = (item) => {
    //     this.setState(() => {
    //         if (!item.match && item != -1) {
    //             this.state.activeDate.setDate(item);
    //             return this.state;
    //         }
    //     });
    // };

    changeMonth = (n) => {
        this.setState(() => {
            this.state.activeDate.setMonth(
                this.state.activeDate.getMonth() + n
            )
            return this.state;
        });
    }

    weekDays = [
        "Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"
    ];

    nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    state = {
        activeDate: new Date()
    }

    generateMatrix() {
        var matrix = [];
        // Create header
        matrix[0] = this.weekDays;

        var year = this.state.activeDate.getFullYear();
        var month = this.state.activeDate.getMonth();
        var firstDay = new Date(year, month, 0).getDay();
        var prevMonth = month - 1;
        var maxDays = this.nDays[month];
        if (month == 1) { // February
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                maxDays += 1;
            }
        }

        var counter = 1;
        for (var row = 1; row < 7; row++) {
            matrix[row] = [];
            for (var col = 0; col < 7; col++) {
                matrix[row][col] = -1;
                if (row == 1 && col >= firstDay) {
                    // Fill in rows only after the first day of the month
                    matrix[row][col] = counter++;
                } else if (row > 1 && counter <= maxDays) {
                    // Fill in rows only if the counter's not greater than
                    // the number of days in the month
                    matrix[row][col] = counter++;
                }
            }
        }
        //FILL THE DAYS OF THE PREVIOUS MONTH
        var firstCount = matrix[1].filter(el => el == -1).length
        var idx = 0;
        for (var el of matrix[1]) {
            if (el == -1) {
                el = this.nDays[prevMonth] - (firstCount - 1)
                console.log(el)
                matrix[1][idx] = el
            }
            firstCount--
            idx++
        }
        //FILL THE DAYS OF THE NEXT MONTH
        var count = 1
        matrix = matrix.filter(row => row[0] !== -1)
        for (var i = 5; i < matrix.length; i++) {
            for (var y = 0; y < 7; y++) {
                if (matrix[i][y] == -1) {
                    matrix[i][y] = count
                    count++
                }
            }
        }
        console.log(firstCount)
        console.log(prevMonth)
        console.log(matrix)
        return matrix;
    }


    render() {
        var matrix = this.generateMatrix();

        var rows = [];
        rows = matrix.map((row, rowIndex) => {
            var rowItems = row.map((item, colIndex) => {
                if (colIndex != 5 && colIndex != 6)
                    return (rowIndex == 0 ?
                        //render week days, sort of header
                        <RN.View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                height: '0%',
                                width: '20%',
                                borderRadius: 10,
                            }}>
                            <RN.Text
                                style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    backgroundColor: 'transparent',
                                    color: colIndex == 6 ? '#a00' : '#000',
                                    fontWeight: 'bold'
                                }}
                                onPress={() => this._onPress(item)}>
                                {item != -1 ? item : ''}
                            </RN.Text>
                        </RN.View>
                        :
                        //render calendar days
                        <RN.View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                margin: 0,
                                height: '130%',
                                width: '20%',
                                borderRadius: 10,
                            }}>
                            <RN.Text
                                style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    // Highlight header
                                    backgroundColor: 'transparent',
                                    // Highlight Sundays
                                    color: colIndex == 6 ? '#a00' : '#000',
                                    // Highlight current date
                                    fontWeight: item == this.state.activeDate.getDate()
                                        ? 'bold' : ' '
                                }}
                            //DA SOSTITUIRE CON METODO PER INSERIRE I TASKS    
                            // onPress={() => this._onPress(item)}
                            >
                                {item != -1 ? item : ''}
                            </RN.Text>
                        </RN.View>
                    );
            });

            return (
                <RN.View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}>
                    {rowItems}
                </RN.View>
            );
        });

        return (
            <RN.SafeAreaView style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'plum',
                width: '80%',
                borderRadius: 10
            }}>
                <RN.View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <RN.View style={{
                        height: '5%',
                        alignSelf: 'flex-start',
                        marginLeft: '5%',
                        marginTop: '3%'
                    }}>
                        <RN.Text style={{
                            fontWeight: 'bold',
                            fontSize: 28,
                            textAlign: 'center'
                        }}>
                            {this.months[this.state.activeDate.getMonth()]} &nbsp;
                            {this.state.activeDate.getFullYear()}
                        </RN.Text>
                    </RN.View>
                    <RN.View style={{
                        columnGap: '70%',
                        flexDirection: 'row',
                        height: '5%',
                        marginRight: '10%',
                        marginTop: '3%'
                    }}>
                        <Ionicons name='chevron-back-outline' color={'black'} size={40} onPress={() => this.changeMonth(-1)}/>
                        <Ionicons name='chevron-forward-outline' color={'black'} size={40} onPress={() => this.changeMonth(+1)}/>
                    </RN.View>
                </RN.View>
                {rows}
            </RN.SafeAreaView>
        );
    }
}

// Export for now to get rid of error and see preview:
export default OtherTimeSHeet