export default function(){
    return <>
         <Text>Pincode</Text>
            <TextInput
            onChangeText={x=> {localStorage.save('pincodes', x), set(x)}}
            value={value}
            style={{borderColor:"black", borderWidth:1, marginTop:10, marginBottom:10,  minHeight:60}}

            multiline={true}
            placeholder="pincodes"
            keyboardType="numeric"
      />
    <>
}