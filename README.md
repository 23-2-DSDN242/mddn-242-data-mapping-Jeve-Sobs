[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/fhdOjw6q)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12013312&assignment_repo_type=AssignmentRepo)
## Creative Coding 2: Custom Pixel

# Training 

Initially, I had numerous issues with training my images. However, this was mainly due to my masks being inverted. This challenge might have been beneficial, as it prompted me to be more selective with my photos. I chose to focus on a single individual rather than multiple people. The output of my test image was commendable, with most imperfections being rectified through software. Nonetheless, some imperfections weren't feasible to address due to software limitations, particularly when considering performance.

# Design

My final result was closely aligned with my initial vision but with some enhancements:

1. **Blur Effect**: I refined the blur effect to align with my concept of portraying a chaotic world around someone. I'm quite pleased with the result. The randomised rendering provides a fresh effect with every new image.
2. **Subject Highlight**: I accentuated my subject to emphasise that they were the focal point of the image.
3. **Checkerboard Pattern**: Initially, I introduced a checkerboard pattern as a simple test. But I grew fond of how it appeared over the lighter segments of the image. I set the pattern to render only on areas of the image that exceeded a certain brightness, creating an intriguing effect.
   
   ![Image 1](images/displayImage1.png)

   Once I realised the image appeared rather flat and considering that the white sections of my test image were the subject's attire, I decided to distort the checkerboard to simulate its presence on the clothing. This improvised effect turned out much better than anticipated, considering the checkerboard was just a proof of concept.

   ![Image 2](images/displayImage2.png)

   ![Image 3](images/displayImage3.png)

# Technical 

For the outline, I looped through the mask pixels to identify pixels that belonged to the mask object. Then, I examined all four neighbouring pixels to ascertain if they were part of the mask. If any weren't part of the mask, I rendered a point at the original pixel's position. For the checkerboard distortion, I employed sine and cosine functions.

# Final Image 

I selected my final image because the blur effectively showcases all elements of my filter, with minimal imperfections.

![Final Image](images/finalImage.png)
