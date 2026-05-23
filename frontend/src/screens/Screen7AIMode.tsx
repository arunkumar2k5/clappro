import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, FileText, Camera, Send, Settings, Loader, Download } from 'lucide-react';
import axios from 'axios';
import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer } from 'docx';
import { saveAs } from 'file-saver';
import { ExtractionResult } from '@/types';
import '../screens/SharedScreen.css';

interface Screen7AIModeProps {
  baseResult: ExtractionResult;
  candidateResult: ExtractionResult;
  componentType: string;
  onBack: () => void;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

export const Screen7AIMode: React.FC<Screen7AIModeProps> = ({
  baseResult,
  candidateResult,
  componentType,
  onBack,
}) => {
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string>('');
  const [loadingAnalysis, setLoadingAnalysis] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [showPromptEditor, setShowPromptEditor] = useState(false);
  const [showSummary, setShowSummary] = useState(true);
  const [systemPrompt, setSystemPrompt] = useState(
    `You are an expert Electronics Digital Engineer specializing in ${componentType} memory components. 
You have deep knowledge of timing parameters, AC/DC characteristics, and compatibility analysis for memory ICs.
Help the user understand timing diagrams, parameter specifications, and compatibility issues between components.`
  );
  const [editablePrompt, setEditablePrompt] = useState(systemPrompt);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    performAIAnalysis();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const performAIAnalysis = async () => {
    setLoadingAnalysis(true);
    try {
      // Prepare data for AI analysis
      const analysisPrompt = `Analyze the timing compatibility between these two ${componentType} components:

BASE COMPONENT: ${baseResult.partNumber} (${baseResult.manufacturer})
CANDIDATE COMPONENT: ${candidateResult.partNumber} (${candidateResult.manufacturer})

Please analyze the READ and WRITE cycle timing parameters and provide:
1. Overall compatibility verdict (COMPATIBLE / NOT COMPATIBLE / NEEDS REVIEW)
2. Detailed analysis of READ cycle parameters
3. Detailed analysis of WRITE cycle parameters
4. Any critical timing violations or concerns
5. Recommendations for the replacement

Base Component Parameters:
${JSON.stringify(baseResult.parameters, null, 2)}

Candidate Component Parameters:
${JSON.stringify(candidateResult.parameters, null, 2)}`;

      const response = await axios.post('/api/chat', {
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: analysisPrompt
          }
        ]
      });

      setAiAnalysisResult(response.data.response || 'Analysis completed. Please review the results.');
    } catch (error) {
      console.error('AI Analysis failed:', error);
      setAiAnalysisResult('Failed to perform AI analysis. Please check your API configuration and try again.');
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const handlePdfClick = (result: ExtractionResult) => {
    if (result.datasheetFile) {
      const blobUrl = URL.createObjectURL(result.datasheetFile);
      window.open(blobUrl, '_blank');
    } else if (result.datasheetUrl) {
      window.open(result.datasheetUrl, '_blank');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setChatInput(prev => prev + '\n[Image attached]');
        // Store image for sending with next message
        if (fileInputRef.current) {
          fileInputRef.current.dataset.imageData = imageData;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() && !fileInputRef.current?.dataset.imageData) return;

    const imageData = fileInputRef.current?.dataset.imageData;
    const newMessage: ChatMessage = {
      role: 'user',
      content: chatInput,
      image: imageData
    };

    setChatMessages(prev => [...prev, newMessage]);
    setChatInput('');
    if (fileInputRef.current) {
      fileInputRef.current.dataset.imageData = '';
    }

    setSendingMessage(true);

    try {
      const messages = [
        { role: 'system', content: systemPrompt },
        ...chatMessages.map(msg => ({
          role: msg.role,
          content: msg.content + (msg.image ? '\n[Image context provided]' : '')
        })),
        { role: 'user', content: chatInput }
      ];

      const response = await axios.post('/api/chat', { messages });

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.data.response || 'No response received.'
      };

      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat failed:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Failed to get response. Please check your API configuration.'
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleSavePrompt = () => {
    setSystemPrompt(editablePrompt);
    setShowPromptEditor(false);
  };

  const handleExportToWord = async () => {
    if (!aiAnalysisResult) return;

    try {
      // Parse the AI analysis result into structured sections
      const lines = aiAnalysisResult.split('\n');
      const children = [];

      // Title
      children.push(
        new Paragraph({
          text: 'AC Timing Analysis Report',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 }
        })
      );

      // Component Info
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Base Component: ', bold: true }),
            new TextRun(baseResult.partNumber + ' (' + baseResult.manufacturer + ')')
          ],
          spacing: { after: 200 }
        })
      );

      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Candidate Component: ', bold: true }),
            new TextRun(candidateResult.partNumber + ' (' + candidateResult.manufacturer + ')')
          ],
          spacing: { after: 400 }
        })
      );

      // Add analysis content
      for (const line of lines) {
        const trimmedLine = line.trim();
        
        if (!trimmedLine) {
          children.push(new Paragraph({ text: '', spacing: { after: 200 } }));
          continue;
        }

        // Check if it's a heading (contains numbers like 1., 2., etc. or all caps)
        if (/^\d+\./.test(trimmedLine) || trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length < 50) {
          children.push(
            new Paragraph({
              text: trimmedLine,
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 300, after: 200 }
            })
          );
        } else if (trimmedLine.startsWith('-') || trimmedLine.startsWith('•')) {
          // Bullet point
          children.push(
            new Paragraph({
              text: trimmedLine.replace(/^[-•]\s*/, ''),
              bullet: { level: 0 },
              spacing: { after: 100 }
            })
          );
        } else {
          // Regular paragraph
          children.push(
            new Paragraph({
              text: trimmedLine,
              spacing: { after: 200 }
            })
          );
        }
      }

      // Footer
      children.push(
        new Paragraph({
          text: '',
          spacing: { before: 400 }
        })
      );

      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Generated by CLAP PRO - Component Lifecycle Analysis Platform', italics: true, size: 20 })
          ],
          alignment: AlignmentType.CENTER
        })
      );

      const doc = new Document({
        sections: [{
          properties: {},
          children: children
        }]
      });

      const blob = await Packer.toBlob(doc);
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
      saveAs(blob, `Timing_Analysis_${baseResult.partNumber}_vs_${candidateResult.partNumber}_${timestamp}.docx`);
    } catch (error) {
      console.error('Export to Word failed:', error);
      alert('Failed to export to Word. Please try again.');
    }
  };

  return (
    <div className="screen-container">
      <div className="screen-background"></div>
      <div className="screen-card">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">AI-Powered Timing Analysis</h2>
              <p className="text-gray-300">
                {baseResult.partNumber} vs {candidateResult.partNumber}
              </p>
            </div>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <ArrowLeft size={20} />
              Back
            </button>
          </div>

          {/* PDF View Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => handlePdfClick(baseResult)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <FileText size={18} />
              View Base PDF ({baseResult.partNumber})
            </button>
            <button
              onClick={() => handlePdfClick(candidateResult)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <FileText size={18} />
              View Candidate PDF ({candidateResult.partNumber})
            </button>
          </div>

          {/* Single Screen Layout */}
          {showSummary && !loadingAnalysis && aiAnalysisResult && (
            <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">AI Analysis Summary</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleExportToWord}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-100 font-semibold text-sm"
                  >
                    <Download size={18} />
                    Export to Word
                  </button>
                  <button
                    onClick={() => setShowSummary(false)}
                    className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 text-sm"
                  >
                    Hide Summary
                  </button>
                </div>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
                    {aiAnalysisResult}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {!showSummary && !loadingAnalysis && (
            <div className="mb-4">
              <button
                onClick={() => setShowSummary(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
              >
                Show Summary
              </button>
            </div>
          )}

          {loadingAnalysis && (
            <div className="bg-white rounded-lg shadow p-8 mb-4">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <Loader className="animate-spin mx-auto mb-4 text-purple-600" size={40} />
                  <p className="text-gray-600">Analyzing timing compatibility...</p>
                </div>
              </div>
            </div>
          )}

          {/* Chat Interface - Full Width */}
          <div className="bg-white rounded-lg shadow overflow-hidden" style={{ height: showSummary ? 'calc(100vh - 550px)' : 'calc(100vh - 350px)' }}>
            <div className="h-full flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Expert Chat Assistant</h3>
              <button
                onClick={() => setShowPromptEditor(!showPromptEditor)}
                className="p-1 hover:bg-white/20 rounded"
                title="View/Edit System Prompt"
              >
                <Settings size={20} className="text-white" />
              </button>
            </div>

            {/* System Prompt Editor */}
            {showPromptEditor && (
                <div className="border-b border-gray-200 p-4 bg-gray-50">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    System Prompt:
                  </label>
                  <textarea
                    value={editablePrompt}
                    onChange={(e) => setEditablePrompt(e.target.value)}
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleSavePrompt}
                      className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditablePrompt(systemPrompt);
                        setShowPromptEditor(false);
                      }}
                      className="px-4 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
              </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.length === 0 && (
                  <div className="text-center text-gray-500 mt-8">
                    <p className="text-sm">Ask questions about timing parameters, compatibility, or upload timing diagrams for analysis.</p>
                  </div>
                )}
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {msg.image && (
                        <img
                          src={msg.image}
                          alt="Uploaded"
                          className="max-w-full rounded mb-2"
                        />
                      )}
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {sendingMessage && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <Loader className="animate-spin text-gray-600" size={20} />
                    </div>
                  </div>
                )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-200 p-4">
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                    title="Upload timing diagram or screenshot"
                  >
                    <Camera size={20} className="text-gray-600" />
                  </button>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    placeholder="Ask about timing parameters, compatibility..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={sendingMessage || (!chatInput.trim() && !fileInputRef.current?.dataset.imageData)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
