# Hướng dẫn chụp ảnh Mockup cho Bài kiểm tra 2.4 (HTML Forms & Inputs qua hình ảnh)

Bài kiểm tra `test-2.4.json` là bài kiểm tra nhận diện trực quan. Người dùng sẽ nhìn vào ảnh chụp các phần tử form trên trình duyệt để đoán thẻ HTML, thuộc tính (`type`, `name`, `placeholder`, `required`...) tương ứng.

Dưới đây là đặc tả các file ảnh cần chụp bổ sung và lưu vào thư mục `public/test-2.4/` để bài thi hiển thị chính xác:

| Tên file ảnh | Mô tả nội dung cần chụp | Thẻ HTML/Thuộc tính gợi ý chụp |
|---|---|---|
| `q1_checkbox.png` | Một ô chọn hình vuông đã được tích chọn (checked), bên cạnh có dòng chữ "Tôi đồng ý với điều khoản". | `<input type="checkbox" checked>` |
| `q2_radio_checked.png` | Hai nút chọn hình tròn (Radio buttons) "Nam" và "Nữ". Nút "Nam" đang được chọn. | `<input type="radio" name="gender">` |
| `q3_textarea.png` | Một khung nhập văn bản lớn nhiều dòng có thể co giãn, bên trong hiển thị chữ gợi ý mờ. | `<textarea rows="4" cols="50">` |
| `q4_select.png` | Một hộp chọn dạng dropdown (thả xuống) hiển thị giá trị đang chọn là "Hà Nội". | `<select>` chứa `<option>` |
| `q5_file_picker.png` | Giao diện nút chọn file mặc định của trình duyệt: Nút "Choose File" kèm dòng chữ "No file chosen". | `<input type="file">` |
| `q6_password.png` | Một ô nhập mật khẩu chứa các ký tự đã gõ nhưng bị ẩn dưới dạng dấu chấm tròn đen hoặc dấu sao. | `<input type="password">` |
| `q7_placeholder.png` | Ô nhập văn bản bình thường có dòng chữ gợi ý mờ "Nhập số điện thoại của bạn...". | `<input placeholder="...">` |
| `q8_fieldset_legend.png` | Khung viền bao quanh một nhóm ô nhập liệu, tại góc trên bên trái khung viền đè chữ "Thông tin liên hệ". | `<fieldset>` và `<legend>` |
| `q9_color_picker.png` | Hộp chọn màu sắc mặc định của trình duyệt đang hiển thị một ô màu hoặc bảng chọn màu sắc trực quan. | `<input type="color">` |
| `q10_disabled.png` | Một ô nhập liệu bị làm xám đi (greyed out) và hiển thị biểu tượng con trỏ không cho phép tương tác. | `<input disabled value="...">` |
| `q11_range_slider.png` | Một thanh trượt chọn giá trị nằm ngang có nút kéo điều chỉnh. | `<input type="range">` |
| `q12_date.png` | Ô nhập lịch hiển thị định dạng ngày tháng năm dd/mm/yyyy kèm icon lịch nhỏ ở góc phải. | `<input type="date">` |
| `q13_optgroup.png` | Danh sách thả xuống select đang mở rộng, hiển thị các tiêu đề nhóm in đậm "Trái cây", "Rau củ" và các tùy chọn con bên dưới thụt lề vào. | `<optgroup label="...">` |
| `q14_number.png` | Ô nhập số hiển thị giá trị là "10" và ở mép phải có hai phím mũi tên nhỏ hướng lên/xuống (spinbox). | `<input type="number">` |
| `q15_validation_tooltip.png` | Một ô nhập liệu để trống bị bao quanh bởi viền đỏ kèm bong bóng thông báo lỗi của trình duyệt: "Vui lòng điền vào trường này" (hoặc "Please fill out this field"). | `<input required>` khi submit thiếu dữ liệu |

---

### Lưu ý khi chụp:
1. Bạn hãy chạy ứng dụng, chụp màn hình các phần tử tương ứng của trình duyệt Chrome/Firefox (nên zoom lớn để ảnh hiển thị rõ nét).
2. Lưu các ảnh trên vào thư mục `/home/konnn04/Desktop/basic-web-training/public/test-2.4/` với định dạng **PNG** đúng tên file ở cột 1.
