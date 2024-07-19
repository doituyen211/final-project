$(document).ready(function(){
    $('#toggleFormBtn').click(function(){
        $('#modalLabel').text('Thêm thông tin');
        $('#inputModal').modal('show');
        $('#addBtn').show();
        $('#updateBtn').hide();
      
    });

    $('.editFormBtn').click(function(){
        $('#addBtn').hide();
        $('#updateBtn').show();
        $('#modalLabel').text('Sửa thông tin');
        $('#inputModal').modal('show');
        
    });

    $('.deleteBtn').click(function() {
        
    });

    $('.btnDetail').click(function(){
        $('#detailModal').modal('show');
      
    });
});