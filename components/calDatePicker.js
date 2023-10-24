import Calendar from "react-native-calendar-range-picker";

export default function MyRangePicker() {
    return (
        <View style={{ flex: 1 }}>
            <Calendar
                startDate="2020-05-05"
                endDate="2020-05-12"
                onChange={({ startDate, endDate }) => console.log({ startDate, endDate })}
            />
        </View>)
}