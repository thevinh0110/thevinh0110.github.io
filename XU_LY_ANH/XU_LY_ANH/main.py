import cv2
import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk
import numpy as np

class ImageProcessingApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Image Processing App")
        self.root.configure(bg="#F0F0F0")  # Background color

        self.image_path = None
        self.kernel_size = 5
        self.gamma = 1.5  # Default gamma value
        self.algorithm_var = tk.StringVar()
        self.algorithm_var.set("Median Filter")  # Default value

        self.create_widgets()

    def apply_noise_reduction(self):
        image = cv2.imread(self.image_path)
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        blurred_image = cv2.GaussianBlur(gray_image, (self.kernel_size, self.kernel_size), 0)

        # Display the original and processed images
        self.display_images(gray_image, "Original Image")
        self.display_images(blurred_image, "Processed Image (Noise Reduction)")

    def apply_contrast(self):
        image = cv2.imread(self.image_path)
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        enhanced_image = clahe.apply(gray_image)

        # Display the original and processed images
        self.display_images(gray_image, "Original Image")
        self.display_images(enhanced_image, "Processed Image (Contrast)")

    def apply_stretch(self):
        image = cv2.imread(self.image_path)
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        stretched_image = np.power(gray_image / float(np.max(gray_image)), self.gamma) * 255.0
        stretched_image = np.uint8(stretched_image)

        # Display the original and processed images
        self.display_images(gray_image, "Original Image")
        self.display_images(stretched_image, "Processed Image (Stretch)")

    def apply_max_filter(self):
        image = cv2.imread(self.image_path)
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        max_filtered_image = cv2.dilate(gray_image, np.ones((self.kernel_size, self.kernel_size), np.uint8))

        # Display the original and processed images
        self.display_images(gray_image, "Original Image")
        self.display_images(max_filtered_image, "Max Filtered Image")

    def apply_min_filter(self):
        image = cv2.imread(self.image_path)
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        min_filtered_image = cv2.erode(gray_image, np.ones((self.kernel_size, self.kernel_size), np.uint8))

        # Display the original and processed images
        self.display_images(gray_image, "Original Image")
        self.display_images(min_filtered_image, "Min Filtered Image")

    def apply_midpoint_filter(self):
        image = cv2.imread(self.image_path)
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        max_filtered_image = cv2.dilate(gray_image, np.ones((self.kernel_size, self.kernel_size), np.uint8))
        min_filtered_image = cv2.erode(gray_image, np.ones((self.kernel_size, self.kernel_size), np.uint8))
        midpoint_filtered_image = (max_filtered_image + min_filtered_image) // 2

        # Display the original and processed images
        self.display_images(gray_image, "Original Image")
        self.display_images(midpoint_filtered_image, "Midpoint Filtered Image")

    def apply_Mean_filter(self):
        image = cv2.imread(self.image_path)
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        filtered_image = cv2.blur(gray_image, (self.kernel_size, self.kernel_size))

        # Display the original and processed images
        self.display_images(gray_image, "Original Image")
        self.display_images(filtered_image, "Filtered Image (Mean Filter)")

    def create_widgets(self):
        # Frame to hold the widgets
        main_frame = tk.Frame(self.root, padx=20, pady=20, bg="#F0F0F0")  # Light gray background
        main_frame.pack(expand=True)

        # Select Image Button
        select_image_button = tk.Button(main_frame, text="Select Image", command=self.select_image, bg="#4CAF50", fg="white")  # Green button
        select_image_button.grid(row=0, column=0, pady=10)

        # Dropdown for choosing algorithm
        algorithms = ["Median Filter", "Noise Reduction", "Contrast", "Stretch", "Max and Min Filter", "Midpoint Filter"]
        algorithm_menu = tk.OptionMenu(main_frame, self.algorithm_var, *algorithms)
        algorithm_menu.config(bg="#4CAF50", fg="white")  # Green dropdown
        algorithm_menu.grid(row=0, column=1, pady=10)

        # Process Image Button
        process_button = tk.Button(main_frame, text="Process Image", command=self.process_image, bg="#008CBA", fg="white")  # Blue button
        process_button.grid(row=0, column=2, pady=10)

    def select_image(self):
        file_path = filedialog.askopenfilename()
        if file_path:
            self.image_path = file_path

    def process_image(self):
        if self.image_path:
            algorithm = self.algorithm_var.get()

            if algorithm == "Median Filter":
                self.apply_median_filter()
            elif algorithm == "Noise Reduction":
                self.apply_noise_reduction()
            elif algorithm == "Contrast":
                self.apply_contrast()
            elif algorithm == "Stretch":
                self.apply_stretch()
            elif algorithm == "Max and Min Filter":
                self.apply_max_filter()
                self.apply_min_filter()
            elif algorithm == "Midpoint Filter":
                self.apply_midpoint_filter()
            elif algorithm == "Mean Filter":
                self.apply_Mean_filter()

    def apply_median_filter(self):
        image = cv2.imread(self.image_path)
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        filtered_image = cv2.medianBlur(gray_image, self.kernel_size)

        # Display the original and processed images
        self.display_images(gray_image, "Original Image")
        self.display_images(filtered_image, "Filtered Image (Median Filter)")

    def display_images(self, image, title):
        image_pil = Image.fromarray(image)
        image_tk = ImageTk.PhotoImage(image_pil)

        display_window = tk.Toplevel(self.root)
        display_window.title(title)

        label = tk.Label(display_window, image=image_tk)
        label.image = image_tk
        label.pack()

        display_window.geometry(f"{image.shape[1]}x{image.shape[0]}")
        self.root.mainloop()

def main():
    root = tk.Tk()
    app = ImageProcessingApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()
