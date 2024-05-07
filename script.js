// // NFC o'qish va yozish uchun birinchi NFC obyektini olish
// const nfc = new NDEFReader();

// // NFC haydovchisini qo'llab-quvvatlash uchun tekshirish
// if ('NDEFReader' in window) {
//   nfc.scan().then(() => {
//     console.log('NFC haydovchisi ochdi');
//     // NFC haydovchisi ochilgandan so'ng o'qishni kuzatishni boshlash
//     nfc.addEventListener('reading', event => {
//       const message = event.message;
//       // NFC'dan olingan ma'lumotlarni o'qish
//       for (const record of message.records) {
//         console.log('NFC oqildi:', record.recordType, record.data);
//       }
//     });
//   }).catch(error => {
//     console.log('NFC haydovchisi xatosi:', error);
//   });
// } else {
//   console.log('NFC qo\'llab-quvvati mavjud emas');
// }

// // NFC ga ma'lumot yozish
// const textRecord = new TextEncoder().encode('Salom, NFC!');
// const record = { recordType: "text", data: textRecord };
// nfc.write(record).then(() => {
//   console.log('NFC yozildi');
// }).catch(error => {
//   console.log('NFC yozish xatosi:', error);
// });


// NFC o'qish tugagandan keyin ishga tushadigan funksiya
function handleNFCData(nfcData) {
  // O'qigan NFC ma'lumotlari bilan qanday amal bajarish kerakligini aniqlang
  // Misol uchun, ularni serverga yuborish uchun AJAX so'rovini yaratish

  // AJAX so'rovi uchun ma'lumotlarni tayyorlash
  var requestData = {
    nfcData: nfcData
  };

  // AJAX so'rovi yuborish
  fetch('/api/nfc-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
  .then(function(response) {
    // Serverdan javobni tekshirish
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('NFC ma\'lumotlari yuborishda xatolik yuz berdi.');
    }
  })
  .then(function(data) {
    // Serverdan olingan javobni ishlatish
    console.log('Serverdan qaytgan javob:', data);

    // Boshqa funktsiyalarga o'tkazish mumkin
    // Masalan, data ni ko'rish, tahrirlash, o'zgartirish, boshqa amallarni bajarish, va hokazo.
  })
  .catch(function(error) {
    // Xatolarni qayta ishlash
    console.error('Xatolik:', error);
  });
}

// NFC o'qishni tekshirish uchun qurilma va brauzer qo'llab-quvvati
if ('NDEFReader' in window && 'nfc' in navigator) {
  // NFC-ni yoqing
  navigator.nfc
    .addEventListener('reading', function(event) {
      // NFC ma'lumotlarini o'qish
      event
        .read()
        .then(function({ records }) {
          // O'qigan ma'lumotlarni XatoFormatinga o'tkazish
          var formattedData = records.map(function(record) {
            return {
              recordType: record.recordType,
              data: record.data
            };
          });
          
          // O'qigan ma'lumotlarni boshqa funktsiyaga o'tkazish
          handleNFCData(formattedData);
        })
        .catch(function(error) {
          console.error('NFC ma\'lumotlarini o\'qishda xatolik:', error);
        });
    })
    .catch(function(error) {
      console.error('NFC-ni yoqingda xatolik:', error);
    });
} else {
  console.warn('NFC-ni yoqing va oqishga qo\'llab-quvvatlovchi brauzeringizda NFC-ni yoqinganligingizni tekshiring.');
}