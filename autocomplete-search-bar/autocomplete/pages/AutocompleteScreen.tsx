import { useState, useEffect  } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  FlatList,
  Pressable,
  Image,

} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Product } from "../types/product";

async function getProducts (page: number = 1) : Promise<Product[]>{
  let endpoint = ""; //endpoint for geting product by name
  const res = await fetch(endpoint);
  if (res) {
    //const data: Product[] = await res.json();
    const data: Product[] = [{barcode:"0000000000", name: "test1", image_url: "https://cpmr-islands.org/wp-content/uploads/sites/4/2019/07/Test-Logo-Small-Black-transparent-1.png"},
      {barcode:"0000000000", name: "test1", image_url: "https://cpmr-islands.org/wp-content/uploads/sites/4/2019/07/Test-Logo-Small-Black-transparent-1.png"},
      {barcode:"0000000000", name: "test2", image_url: "https://cpmr-islands.org/wp-content/uploads/sites/4/2019/07/Test-Logo-Small-Black-transparent-1.png"},
      {barcode:"0000000000", name: "test3", image_url: "https://cpmr-islands.org/wp-content/uploads/sites/4/2019/07/Test-Logo-Small-Black-transparent-1.png"},
      {barcode:"0000000000", name: "test4", image_url: "https://cpmr-islands.org/wp-content/uploads/sites/4/2019/07/Test-Logo-Small-Black-transparent-1.png"},
      {barcode:"0000000000", name: "test5", image_url: null}]
    return data;
  }
  return []; 
}

export default function AutocompleteScreen() {
  const [input, setInput] = useState<string>();
  const [data, setData] = useState<Product[]>();

  const onChangeText = async (text: string) => {
    setInput(text);
    if (text.length === 0) return setData([]);
    if (text.length > 2) {
      const data: Product[] = await getProducts();
      if (data.length > 0) setData(data);
    }
  };

  

  

  const getItemText = (item : Product) => {
    const [imageExists, setImageExists] = useState(false);
  
    useEffect(() => {
      const checkImage = async () => {
        if (!item.image_url) {
          setImageExists(false);
          return;
        }
  
        try {
          const response = await fetch(item.image_url);
          setImageExists(response.ok);
        } catch (error) {
          setImageExists(false);
        }
      };
  
      checkImage();
    }, [item.image_url]);
  
    return (
      <View style={styles.itemTextConatiner}>
        {imageExists ? (
          <Image
            source={{ uri: item.image_url! }}
            style={styles.imageStyle}
            onError={() => setImageExists(false)} 
          />
        ) : (
          <MaterialIcons name="image" color="black" size={30} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>{item.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.inputLabel}>Search Product</Text>
        <TextInput
          placeholder="Find Product"
          value={input}
          onChangeText={onChangeText}
          style={styles.input}
        />
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <Pressable
              style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
              onPress={() => alert("navigate passing" + JSON.stringify(item))}
            >
              {getItemText(item)}
            </Pressable>
          )}
          keyExtractor={(item, index) => item.name + index}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1 },
  inputLabel: { marginLeft: 12, marginVertical: 5, fontSize: 12 },
  input: {
    height: 40,
    marginHorizontal: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  imageStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  itemTextConatiner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  textContainer: { marginLeft: 10, flexShrink: 1 },
  mainText: { fontWeight: "700" },
  country: { fontSize: 12 },
});
