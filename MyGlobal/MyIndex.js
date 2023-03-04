$(document).ready(function() {
   
    $(".oNama").text(OrganisasiNama);
    $(".oAlamat").text(OrganisasiAlamat);

    // Semua elemen konten awalnya disembunyikan
   // $('#content div').hide();    
    $('.PG').hide();
    
    // Tampilkan elemen home saat halaman dimuat
    $('#Page_01').show();
    
   


    // Tambahkan event handler untuk setiap tombol navigasi
    $('.sidebar-menu a').click(function() {
      // Semua div Page disembunyikan saat tombol navigasi diklik
      $('.PG').hide();
          
      // Ambil id dari elemen yang sesuai dengan tombol navigasi yang diklik
      var PageID = $(this).attr('href');    
     
      // Tampilkan elemen yang sesuai dengan id tersebut
      $(PageID).show();
      console.log(PageID)
      $('html, body').animate({
        scrollTop: 0
      }, 1000);
      
      // Tutup sidebar  jika layar mobile
      $('body').removeClass('sidebar-open');
      
    });

    
  });