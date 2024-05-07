// NFC o'qish va yozish uchun birinchi NFC obyektini olish
const nfc = new NDEFReader();

// NFC haydovchisini qo'llab-quvvatlash uchun tekshirish
if ('NDEFReader' in window) {
  nfc.scan().then(() => {
    console.log('NFC haydovchisi ochdi');
    // NFC haydovchisi ochilgandan so'ng o'qishni kuzatishni boshlash
    nfc.addEventListener('reading', event => {
      const message = event.message;
      // NFC'dan olingan ma'lumotlarni o'qish
      for (const record of message.records) {
        console.log('NFC oqildi:', record.recordType, record.data);
      }
    });
  }).catch(error => {
    console.log('NFC haydovchisi xatosi:', error);
  });
} else {
  console.log('NFC qo\'llab-quvvati mavjud emas');
}

// NFC ga ma'lumot yozish
const textRecord = new TextEncoder().encode('Salom, NFC!');
const record = { recordType: "text", data: textRecord };
nfc.write(record).then(() => {
  console.log('NFC yozildi');
}).catch(error => {
  console.log('NFC yozish xatosi:', error);
});