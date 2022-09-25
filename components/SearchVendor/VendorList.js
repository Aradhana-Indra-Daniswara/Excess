import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { firestore, storage } from '../../config/firebase-config';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collection, doc, getDoc } from "firebase/firestore";
import AppText from '../AppText';

export default function VendorList({ item }) {
  const [promoAmount, setPromoAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const countPromoAmount = async () => {
    try {
      const docRef = doc(firestore, "vendors", item.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data().products;
        console.log(data)
        const promoAmount = data.filter((item) => item.limited_time === true).length
        setPromoAmount(promoAmount)
      }
      setIsLoading(false);
    }
    catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    countPromoAmount()
    console.log(item.id)
  }, [])
  if (isLoading) {
    return <AppText>Loading</AppText>;
  }

  return (
    <View style={{
      paddingVertical: 4,
      flexDirection: 'row'
    }}>
      <Image />
      <View>
        <View>
          <AppText>
            {promoAmount} items on promo
          </AppText>
          <AppText>
            {item.name}, {item.area}
          </AppText>
        </View>
        <View>
          <AppText>4.9</AppText>
          <AppText>2.1 km</AppText>
        </View>
      </View>
    </View>
  );
}
