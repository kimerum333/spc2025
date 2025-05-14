from diffusers import StableDiffusionPipeline
import torch

# 프리트레인된 모델 로드
pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float32
).to("cpu")

# 프롬프트 정의
prompt = "a fantasy castle on a mountain at sunset, high detail, artstation style"

# 이미지 생성
image = pipe(prompt).images[0]

# 이미지 저장
image.save("generated_image.png")
