import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { firestore, storage } from '../../config/firebase-config';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collection, doc, getDoc } from "firebase/firestore";
import AppText from '../AppText';
import { colorStyles } from '../Styling/GlobalStyles';
import Star_icon from '../../assets/star_icon.svg';

export default function VendorList({ vendor }) {
  const [promoAmount, setPromoAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [vendorIconURI, setVendorIconURI] = useState();

  const countPromoAmount = async () => {
    try {
      const docRef = doc(firestore, "vendors", vendor.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const vendorProducts = docSnap.data().products;
        const promoAmount = vendorProducts.filter((product) => product.limited_time === true).length
        setPromoAmount(promoAmount)
      }
    }
    catch (e) {
      console.log("countPromoAmount() " + e.message);
    }
  }

  const fetchVendorImage = async () => {
    const docRef = doc(firestore, "vendors", vendor.id);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const vendorImageUrl = await getDownloadURL(ref(storage, vendor.logo))
        setVendorIconURI(vendorImageUrl);
      }
    }
    catch (error) {
      console.log("fetchVendorImage() " + error.message)
    }
  }

  const loadVendorData = async () => {
    await countPromoAmount();
    await fetchVendorImage();
    setIsLoading(false)
  }
  useEffect(() => {
    loadVendorData();
  }, [])

  if (isLoading) {
    return <AppText>Loading</AppText>;
  }

  return (
    <View style={{
      flexDirection: 'row',
      marginVertical: 4,
      marginHorizontal: 16
    }}>
      <Image source={{ uri: vendorIconURI }} style={{ width: 90, height: 90, marginRight: 8 }} />
      <View style={{ flex: 1, marginVertical: 10 }}>
        <View>
          <AppText style={{ color: colorStyles['excess'], fontSize: 12 }} weight='700'>
            {promoAmount} items on promo
          </AppText>
          <AppText style={{ color: colorStyles['20'], fontSize: 14 }} weight='700'>
            {vendor.name} - {vendor.area}
          </AppText>
        </View>
        <View style={{
          flexDirection: 'row',
          marginTop: 4
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <AppText style={{ color: colorStyles['50'], fontSize: 12, marginRight: 4 }}>4.9</AppText>
            <Star_icon />
          </View>
          <AppText style={{ color: colorStyles['50'], fontSize: 12 }}> • 2.1 km</AppText>
        </View>
      </View>
    </View>
  );
}
