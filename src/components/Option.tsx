interface Optionprops {
    weekNum: string;
}

export default function Option( { weekNum }: Optionprops) {

    return (
        <option value={weekNum}>Week {weekNum}</option>
    )
}