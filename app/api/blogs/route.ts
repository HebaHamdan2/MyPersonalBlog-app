import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { v2 as cloudinary } from 'cloudinary';

const LoadDB = async () => {
    await ConnectDB();
};

LoadDB();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: NextRequest) {
    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog);
    } else {
        const blogs = await BlogModel.find({});
        return NextResponse.json({ blogs });
    }
}

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const image = formData.get('image');
    if (!(image instanceof File)) {
        return NextResponse.json({ success: false, msg: "Invalid image file" }, { status: 400 });
    }

    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);


    try {
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: 'image' },
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                }
            );
            stream.end(buffer);
        });

        if (!uploadResult || !uploadResult.secure_url) {
            return NextResponse.json({ success: false, msg: "Image upload failed" }, { status: 500 });
        }

        const blogData = {
            title: `${formData.get('title')}`,
            description: `${formData.get('description')}`,
            category: `${formData.get('category')}`,
            author: `${formData.get('author')}`,
            image: uploadResult.secure_url, 
            authorImage: `${formData.get('authorImage')}`
        };

        await BlogModel.create(blogData);
        return NextResponse.json({ success: true, msg: "Blog Added Successfully" });

    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return NextResponse.json({ success: false, msg: "Error uploading image" }, { status: 500 });
    }
}
export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id");

    const deletedBlog = await BlogModel.findByIdAndDelete(id);

    if (!deletedBlog) {
        return NextResponse.json(
            { success: false, msg: "Blog not found" },
            { status: 404 }
        );
    }

    if (deletedBlog.image) {
        const publicId = deletedBlog.image.split("/").pop()?.split(".")[0];

        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }
    }

    return NextResponse.json({
        success: true,
        msg: "Blog Deleted Successfully",
    });
}
