import Button from "@/components/Button";
export default function app() {
    return (
        <div>
            <h1 className="text-4xl mb-3 font-bold">Lorem ipsum dolor sit amet.</h1>
            <h2 className="text-2xl"><strong>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse quibusdam, voluptas non distinctio labore aperiam repellendus sequi veniam, explicabo,</strong> <span className="text-gray-400">impedit animi et necessitatibus ducimus beatae dicta est? Fuga est maxime expedita necessitatibus illum velit, amet, ipsa omnis sequi aut magni hic ipsam accusamus eligendi voluptates dignissimos commodi dolores asperiores eveniet?</span></h2>
            <Button 
        label="Click Me" 
        onClick={() => alert("Tombol ditekan oleh Rakha!")} 
      />
        </div>
    );
}
