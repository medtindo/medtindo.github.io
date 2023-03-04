$(document).ready(function () {

    var BU = 'https://antrean.rsghmadiun.com:8081/';
    var IDP = Cookies.get('ck_IDPASIEN');
    console.log(IDP);

    $(document).ready(function () {
        $("#ReloadHistoris").click(function () {
            $("#ImgProses").css("display", "block");
            ShowHistoris();
        });

        $(document).ajaxComplete(function () {
            $("#ImgProses").delay(1000).fadeOut();

        });
    });
   

    ShowHistoris();
    ShowDataWebPost();

    function ShowDataWebPost() {
        $.ajax({
            url: BU + 'SIMRS-API/web/post?limit=10',
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $("#DataWebPost").empty()

                $.map(data, function (k, i) {
                    $("#DataWebPost").append(
                        '<div class="d-flex  mb-30">' +
                        '<div class="p-2 rounded10 bg-primary-light"  > ' +
                        '<img  src="' + k.tumbnail + '" alt="user" width="30" height="40">' +
                        '</div>' +
                        '<div class="d-flex flex-column flex-grow-1 fw-500">' +
                        '<a href=wp_post?id=' + k.id + ' target="_blank" class="text-dark hover-primary mb-1 fs-16">' + k.JUDUL + '</a>' +
                        '<span class="text-muted pull-right ml-3"> Tanggal Post : ' + k.TGL + '</span>' +
                        '</div>' +
                        '</div>'
                    )
                })
            },
            error: function (masalah) {
                console.log(masalah);
            }
        });
    }

    function ShowHistoris() {
        var IDP = Cookies.get('ck_IDPASIEN');
        $.ajax({
            url: BU + "/simrs-Api/Antrian/booking/historis/" + IDP + "/limit/10",
            method: "GET",
            dataType: "json",
            success: function (data) {
                $("#JML").text(data.message);
                var n = 0
                $("#HistorisAntrian").empty();
                $.map(data.list, function (k, i) {
                    n++
                    var st = k.STATUS;
                    var wr;
                    st = st.trim();
                    if (st == "B") {
                        st = "visible";
                        wr = "text-success";
                    }

                    if (st == "A") {
                        st = "invisible";
                        wr = "text-primary";
                    }
                    if (st == "S") {
                        st = "invisible";
                        wr = "";
                    }

                    $("#HistorisAntrian").append(
                        '<tr><td>' + n + '. </td><td style="width:120px">Tanggal      </td>  <td>: </td> <td>' + k.TGL + '</td></tr>' +
                        '<tr><td></td><td style="width:120px">Nomor Booking</td>  <td>: </td> <td>' + k.NOMOR + '</td></tr>' +
                        '<tr><td></td><td style="width:120px">Poli Tujuan</td>    <td>: </td> <td>' + k.POLIKLINIK + '</td></tr>' +
                        '<tr><td></td><td style="width:120px">Dokter</td>    <td>: </td> <td>' + k.DOKTER + '</td></tr>' +
                        '<tr><td></td><td style="width:120px">Jenis</td>    <td>: </td> <td>' + k.KATEGORI + '</td></tr>' +
                        '<tr><td></td><td style="width:120px">Status</td>    <td>: </td> <td>' +
                        '<span class="modal-title mr-2 ' + wr + '"><i class="ti-timer mr-2"></i>' + k.STS + '</span>' +
                        '<button type="button" class="Tombol btn waves-effect waves-light btn-xs btn-primary ml-1 ' + st + '"  data-value="' + k.KODEBOOKING + '">' +
                        'Batalkan</button > ' +
                        '</td></tr>'
                    )

                    $("#HistorisAntrian").append('<br/>')


                    $("button.Tombol").click(function () {

                        var c = $(this).attr('data-value');
                        console.log(c);
                        Swal.fire({
                            title: "Apakah Anda Yakin?",
                            html: "<p> Nomor Booking </p><h3> " + c + " </h3><span>Dibatalkan.</span>",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ya, batalkan!'
                        }).then((result) => {
                            if (result.value) {
                                var prm = new Object();
                                prm.NB = c;
                                $.ajax({
                                    url: "/WebService/AjaxService.asmx/HapusBookingAntrian",
                                    method: "POST",
                                    contentType: "application/json",
                                    dataType: "json",
                                    data: JSON.stringify(prm),
                                    success: function (data) {
                                        console.log(data);
                                        var o = JSON.parse(data.d);
                                        if (o.type == "Sukses") {
                                            Swal.fire(
                                                'Deleted!',
                                                'Data booking : ' + c + ' berhasil dihapus',
                                                'success'
                                            )
                                        }
                                        if (o.type == "Gagal") {
                                            Swal.fire("Informasi!", o.message, "error");
                                        }
                                        ShowHistoris();
                                    },
                                    error: function (masalah) {
                                        console.log(masalah);
                                    }
                                });




                            }
                        })

                    });

                  
                })
            },
            error: function (masalah) {
                console.log(masalah);
            }
        });
    }
});