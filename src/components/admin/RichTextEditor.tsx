'use client';

import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
	value: string;
	onChange: (value: string) => void;
	label: string;
}

export function RichTextEditor({ value, onChange, label }: RichTextEditorProps) {
	return (
		<div>
			<span className="ui-label text-slate">{label}</span>
			<div className="mt-2 border border-line bg-white">
				<Editor
					licenseKey="gpl"
					tinymceScriptSrc="/tinymce/tinymce.min.js"
					init={{
						height: 380,
						menubar: false,
						plugins: 'advlist autolink lists link image table code wordcount',
						toolbar:
							'undo redo | blocks | bold italic | bullist numlist | link image table | code',
						content_style:
							'body { font-family: "Instrument Sans", sans-serif; font-size: 15px; color: #0b1b2a; line-height: 1.6; }',
						branding: false,
						statusbar: true,
					}}
					value={value}
					onEditorChange={(next) => onChange(next)}
				/>
			</div>
		</div>
	);
}
