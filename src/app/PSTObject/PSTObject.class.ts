// PST Object is the root class of all PST Items.
// It also provides a number of static utility functions. The most important is
// detectAndLoadPSTObject call which allows extraction of a PST Item from the file.
export class PSTObject {

    constructor() { }

    // substitution table for the compressible encryption type.
    public compEnc = [ 0x47, 0xf1, 0xb4, 0xe6, 0x0b, 0x6a, 0x72, 0x48, 0x85, 0x4e, 0x9e, 0xeb, 0xe2, 0xf8, 0x94,
        0x53, 0xe0, 0xbb, 0xa0, 0x02, 0xe8, 0x5a, 0x09, 0xab, 0xdb, 0xe3, 0xba, 0xc6, 0x7c, 0xc3, 0x10, 0xdd, 0x39,
        0x05, 0x96, 0x30, 0xf5, 0x37, 0x60, 0x82, 0x8c, 0xc9, 0x13, 0x4a, 0x6b, 0x1d, 0xf3, 0xfb, 0x8f, 0x26, 0x97,
        0xca, 0x91, 0x17, 0x01, 0xc4, 0x32, 0x2d, 0x6e, 0x31, 0x95, 0xff, 0xd9, 0x23, 0xd1, 0x00, 0x5e, 0x79, 0xdc,
        0x44, 0x3b, 0x1a, 0x28, 0xc5, 0x61, 0x57, 0x20, 0x90, 0x3d, 0x83, 0xb9, 0x43, 0xbe, 0x67, 0xd2, 0x46, 0x42,
        0x76, 0xc0, 0x6d, 0x5b, 0x7e, 0xb2, 0x0f, 0x16, 0x29, 0x3c, 0xa9, 0x03, 0x54, 0x0d, 0xda, 0x5d, 0xdf, 0xf6,
        0xb7, 0xc7, 0x62, 0xcd, 0x8d, 0x06, 0xd3, 0x69, 0x5c, 0x86, 0xd6, 0x14, 0xf7, 0xa5, 0x66, 0x75, 0xac, 0xb1,
        0xe9, 0x45, 0x21, 0x70, 0x0c, 0x87, 0x9f, 0x74, 0xa4, 0x22, 0x4c, 0x6f, 0xbf, 0x1f, 0x56, 0xaa, 0x2e, 0xb3,
        0x78, 0x33, 0x50, 0xb0, 0xa3, 0x92, 0xbc, 0xcf, 0x19, 0x1c, 0xa7, 0x63, 0xcb, 0x1e, 0x4d, 0x3e, 0x4b, 0x1b,
        0x9b, 0x4f, 0xe7, 0xf0, 0xee, 0xad, 0x3a, 0xb5, 0x59, 0x04, 0xea, 0x40, 0x55, 0x25, 0x51, 0xe5, 0x7a, 0x89,
        0x38, 0x68, 0x52, 0x7b, 0xfc, 0x27, 0xae, 0xd7, 0xbd, 0xfa, 0x07, 0xf4, 0xcc, 0x8e, 0x5f, 0xef, 0x35, 0x9c,
        0x84, 0x2b, 0x15, 0xd5, 0x77, 0x34, 0x49, 0xb6, 0x12, 0x0a, 0x7f, 0x71, 0x88, 0xfd, 0x9d, 0x18, 0x41, 0x7d,
        0x93, 0xd8, 0x58, 0x2c, 0xce, 0xfe, 0x24, 0xaf, 0xde, 0xb8, 0x36, 0xc8, 0xa1, 0x80, 0xa6, 0x99, 0x98, 0xa8,
        0x2f, 0x0e, 0x81, 0x65, 0x73, 0xe4, 0xc2, 0xa2, 0x8a, 0xd4, 0xe1, 0x11, 0xd0, 0x08, 0x8b, 0x2a, 0xf2, 0xed,
        0x9a, 0x64, 0x3f, 0xc1, 0x6c, 0xf9, 0xec ];

    public propertyName: Map<number, string> = new Map([
        [0x0002, 'PidTagAlternateRecipientAllowed'],
        [0x0003, 'PidTagNameidStreamEntry'],
        [0x0004, 'PidTagNameidStreamString'],
        [0x0017, 'PidTagImportance'],
        [0x001A, 'PidTagMessageClass'],
        [0x0023, 'PidTagOriginatorDeliveryReportRequested'],
        [0x0026, 'PidTagPriority'],
        [0x0029, 'PidLidOldWhenStartWhole'],
        [0x002B, 'PidTagRecipientReassignmentProhibited'],
        [0x002E, 'PidTagOriginalSensitivity'],
        [0x0036, 'PidTagSensitivity'],
        [0x0037, 'PidTagSubject'],
        [0x0039, 'PidTagClientSubmitTime'],
        [0x003B, 'PidTagSentRepresentingSearchKey'],
        [0x003F, 'PidTagReceivedByEntryId'],
        [0x0040, 'PidTagReceivedByName'],
        [0x0041, 'PidTagSentRepresentingEntryId'],
        [0x0042, 'PidTagSentRepresentingName'],
        [0x0043, 'PidTagReceivedRepresentingEntryId'],
        [0x0044, 'PidTagReceivedRepresentingName'],
        [0x004D, 'PidTagOriginalAuthorName'],
        [0x0052, 'PidTagReceivedRepresentingSearchKey'],
        [0x0057, 'PidTagMessageToMe'],
        [0x0058, 'PidTagMessageCcMe'],
        [0x0060, 'PidTagStartDate'],
        [0x0061, 'PidTagEndDate'],
        [0x0062, 'PidTagOwnerAppointmentId'],
        [0x0063, 'PidTagResponseRequested'],
        [0x0064, 'PidTagSentRepresentingAddressType'],
        [0x0065, 'PidTagSentRepresentingEmailAddress'],
        [0x0070, 'PidTagConversationTopic'],
        [0x0071, 'PidTagConversationIndex'],
        [0x0075, 'PidTagReceivedByAddressType'],
        [0x0076, 'PidTagReceivedByEmailAddress'],
        [0x0077, 'PidTagReceivedRepresentingAddressType'],
        [0x0078, 'PidTagReceivedRepresentingEmailAddress'],
        [0x007D, 'PidTagTransportMessageHeaders'],
        [0x0C15, 'PidTagRecipientType'],
        [0x0C17, 'PidTagReplyRequested'],
        [0x0C19, 'PidTagSenderEntryId'],
        [0x0C1A, 'PidTagSenderName'],
        [0x0C1D, 'PidTagSenderSearchKey'],
        [0x0C1E, 'PidTagSenderAddressType'],
        [0x0C1F, 'PidTagSenderEmailAddress'],
        [0x0E01, 'PidTagDeleteAfterSubmit'],
        [0x0E02, 'PidTagDisplayBcc'],
        [0x0E03, 'PidTagDisplayCc'],
        [0x0E04, 'PidTagDisplayTo'],
        [0x0E06, 'PidTagMessageDeliveryTime'],
        [0x0E07, 'PidTagMessageFlags'],
        [0x0E08, 'PidTagMessageSize'],
        [0x0E0F, 'PidTagResponsibility'],
        [0x0E20, 'PidTagAttachSize'],
        [0x0E23, 'PidTagInternetArticleNumber'],
        [0x0E38, 'PidTagReplFlags'],
        [0x0E62, 'PidTagUrlCompNameSet'],
        [0x0E79, 'PidTagTrustSender'],
        [0x0FF9, 'PidTagRecordKey'],
        [0x0FFE, 'PidTagObjectType'],
        [0x0FFF, 'PidTagEntryId'],
        [0x1000, 'PidTagBody'],
        [0x1009, 'PidTagRtfCompressed'],
        [0x1013, 'PidTagBodyHtml'],
        [0x1035, 'PidTagInternetMessageId'],
        [0x1039, 'PidTagInternetReferences'],
        [0x1042, 'PidTagInReplyToId'],
        [0x1080, 'PidTagIconIndex'],
        [0x1081, 'PidTagLastVerbExecuted'],
        [0x1082, 'PidTagLastVerbExecutionTime'],
        [0x1096, 'PidTagBlockStatus'],
        [0x10C3, 'PidTagICalendarStartTime'],
        [0x10C4, 'PidTagICalendarEndTime'],
        [0x10F2, 'Unknown_10F2'],
        [0x10F3, 'PidTagUrlCompName'],
        [0x10F4, 'PidTagAttributeHidden'],
        [0x10F5, 'PidTagAttributeSystem'],
        [0x10F6, 'PidTagAttributeReadOnly'],
        [0x3001, 'PidTagDisplayName'],
        [0x3002, 'PidTagAddressType'],
        [0x3003, 'PidTagEmailAddress'],
        [0x3007, 'PidTagCreationTime'],
        [0x3008, 'PidTagLastModificationTime'],
        [0x300B, 'PidTagSearchKey'],
        [0x3701, 'PidTagAttachDataBinary'],
        [0x3702, 'PidTagAttachEncoding'],
        [0x3703, 'PidTagAttachExtension'],
        [0x3704, 'PidTagAttachFilename'],
        [0x3705, 'PidTagAttachMethod'],
        [0x3709, 'PidTagAttachRendering'],
        [0x370B, 'PidTagRenderingPosition'],
        [0x370E, 'PidTagAttachMimeTag'],
        [0x370A, 'PidTagAttachTag'],
        [0x3712, 'PidTagAttachContentId'],
        [0x3714, 'PidTagAttachFlags'],
        [0x3900, 'PidTagDisplayType'],
        [0x39FE, 'PidTagPrimarySmtpAddress'],
        [0x39FF, 'PidTag7BitDisplayName'],
        [0x3A00, 'PidTagAccount'],
        [0x3A08, 'PidTagBusinessTelephoneNumber'],
        [0x3A20, 'PidTagTransmittableDisplayName'],
        [0x3A40, 'PidTagSendRichInfo'],
        [0x3A70, 'PidTagUserX509Certificate'],
        [0x3A71, 'PidTagSendInternetEncoding'],
        [0x3FDE, 'PidTagInternetCodepage'],
        [0x3FF1, 'PidTagMessageLocaleId'],
        [0x3FFD, 'PidTagMessageCodepage'],
        [0x3ff9, 'PidTagCreatorName'],
        [0x4019, 'PidTagSenderFlags'],
        [0x401A, 'PidTagSentRepresentingFlags'],
        [0x401B, 'PidTagReceivedByFlags'],
        [0x401C, 'PidTagReceivedRepresentingFlags'],
        [0x403E, 'Unknown_403E'],
        [0x4A08, 'Unknown_4A08'],
        [0x5902, 'PidTagInternetMailOverrideFormat'],
        [0x5909, 'PidTagMessageEditorFormat'],
        [0x5FDE, 'PidTagRecipientResourceState'],
        [0x5FDF, 'PidTagRecipientOrder'],
        [0x5FEB, 'Unknown_5FEB'],
        [0x5FEF, 'Unknown_5FEF'],
        [0x5FF2, 'Unknown_5FF2'],
        [0x5FF5, 'Unknown_5FF5'],
        [0x5FF6, 'PidTagRecipientDisplayName'],
        [0x5FF7, 'PidTagRecipientEntryId'],
        [0x5FFB, 'PidTagRecipientTrackStatusTime'],
        [0x5FFD, 'PidTagRecipientFlags'],
        [0x5FFF, 'PidTagRecipientTrackStatus'],
        [0x6001, 'PidTagNickname'],
        [0x6610, 'Unknown_6610'],
        [0x6614, 'Unknown_6614'],
        [0x6617, 'Unknown_6617'],
        [0x6619, 'PidTagUserEntryId'],
        [0x6743, 'Unknown_6743'],
        [0x6744, 'Unknown_6744'],
        [0x67F2, 'PidTagLtpRowId'],
        [0x67F3, 'PidTagLtpRowVer'],
        [0x67F4, 'Unknown_67F4'],
        [0x7FFA, 'PidTagAttachmentLinkId'],
        [0x7FFB, 'PidTagExceptionStartTime'],
        [0x7FFC, 'PidTagExceptionEndTime'],
        [0x7FFD, 'PidTagAttachmentFlags'],
        [0x7FFE, 'PidTagAttachmentHidden'],
        [0x7FFF, 'PidTagAttachmentContactPhoto'],
        [0x3FFA, 'PidTagLastModifiedName_W'],
        [0x3FFB, 'PidTagLastModifierEntryId']
    ]);

    //     public static final int NID_TYPE_HID = 0x00; // Heap node
    // public static final int NID_TYPE_INTERNAL = 0x01; // Internal node (section
    //                                                   // 2.4.1)
    // public static final int NID_TYPE_NORMAL_FOLDER = 0x02; // Normal Folder
    //                                                        // object (PC)
    // public static final int NID_TYPE_SEARCH_FOLDER = 0x03; // Search Folder
    //                                                        // object (PC)
    // public static final int NID_TYPE_NORMAL_MESSAGE = 0x04; // Normal Message
    //                                                         // object (PC)
    // public static final int NID_TYPE_ATTACHMENT = 0x05; // Attachment object
    //                                                     // (PC)
    // public static final int NID_TYPE_SEARCH_UPDATE_QUEUE = 0x06; // Queue of
    //                                                              // changed
    //                                                              // objects for
    //                                                              // search
    //                                                              // Folder
    //                                                              // objects
    // public static final int NID_TYPE_SEARCH_CRITERIA_OBJECT = 0x07; // Defines
    //                                                                 // the
    //                                                                 // search
    //                                                                 // criteria
    //                                                                 // for a
    //                                                                 // search
    //                                                                 // Folder
    //                                                                 // object
    // public static final int NID_TYPE_ASSOC_MESSAGE = 0x08; // Folder associated
    //                                                        // information (FAI)
    //                                                        // Message object
    //                                                        // (PC)
    // public static final int NID_TYPE_CONTENTS_TABLE_INDEX = 0x0A; // Internal,
    //                                                               // persisted
    //                                                               // view-related
    // public static final int NID_TYPE_RECEIVE_FOLDER_TABLE = 0X0B; // Receive
    //                                                               // Folder
    //                                                               // object
    //                                                               // (Inbox)
    // public static final int NID_TYPE_OUTGOING_QUEUE_TABLE = 0x0C; // Outbound
    //                                                               // queue
    //                                                               // (Outbox)
    // public static final int NID_TYPE_HIERARCHY_TABLE = 0x0D; // Hierarchy table
    //                                                          // (TC)
    // public static final int NID_TYPE_CONTENTS_TABLE = 0x0E; // Contents table
    //                                                         // (TC)
    // public static final int NID_TYPE_ASSOC_CONTENTS_TABLE = 0x0F; // FAI
    //                                                               // contents
    //                                                               // table (TC)
    // public static final int NID_TYPE_SEARCH_CONTENTS_TABLE = 0x10; // Contents
    //                                                                // table (TC)
    //                                                                // of a
    //                                                                // search
    //                                                                // Folder
    //                                                                // object
    // public static final int NID_TYPE_ATTACHMENT_TABLE = 0x11; // Attachment
    //                                                           // table (TC)
    // public static final int NID_TYPE_RECIPIENT_TABLE = 0x12; // Recipient table
    //                                                          // (TC)
    // public static final int NID_TYPE_SEARCH_TABLE_INDEX = 0x13; // Internal,
    //                                                             // persisted
    //                                                             // view-related
    // public static final int NID_TYPE_LTP = 0x1F; // LTP

    // public String getItemsString() {
    //     return this.items.toString();
    // }

    // protected PSTFile pstFile;
    // protected byte[] data;
    // protected DescriptorIndexNode descriptorIndexNode;
    // protected HashMap<Integer, PSTTableBCItem> items;
    // protected HashMap<Integer, PSTDescriptorItem> localDescriptorItems = null;

    // protected LinkedHashMap<String, HashMap<DescriptorIndexNode, PSTObject>> children;

    // protected PSTObject(final PSTFile theFile, final DescriptorIndexNode descriptorIndexNode)
    //     throws PSTException, IOException {
    //     this.pstFile = theFile;
    //     this.descriptorIndexNode = descriptorIndexNode;

    //     // descriptorIndexNode.readData(theFile);
    //     // PSTTableBC table = new PSTTableBC(descriptorIndexNode.dataBlock.data,
    //     // descriptorIndexNode.dataBlock.blockOffsets);
    //     final PSTTableBC table = new PSTTableBC(new PSTNodeInputStream(this.pstFile,
    //         this.pstFile.getOffsetIndexNode(descriptorIndexNode.dataOffsetIndexIdentifier)));
    //     // System.out.println(table);
    //     this.items = table.getItems();

    //     if (descriptorIndexNode.localDescriptorsOffsetIndexIdentifier != 0) {
    //         // PSTDescriptor descriptor = new PSTDescriptor(theFile,
    //         // descriptorIndexNode.localDescriptorsOffsetIndexIdentifier);
    //         // localDescriptorItems = descriptor.getChildren();
    //         this.localDescriptorItems = theFile
    //             .getPSTDescriptorItems(descriptorIndexNode.localDescriptorsOffsetIndexIdentifier);
    //     }
    // }

    // /**
    //  * for pre-population
    //  * 
    //  * @param theFile
    //  * @param folderIndexNode
    //  * @param table
    //  */
    // protected PSTObject(final PSTFile theFile, final DescriptorIndexNode folderIndexNode, final PSTTableBC table,
    //     final HashMap<Integer, PSTDescriptorItem> localDescriptorItems) {
    //     this.pstFile = theFile;
    //     this.descriptorIndexNode = folderIndexNode;
    //     this.items = table.getItems();
    //     this.table = table;
    //     this.localDescriptorItems = localDescriptorItems;
    // }

    // protected PSTTableBC table;

    // /**
    //  * get the descriptor node for this item
    //  * this identifies the location of the node in the BTree and associated info
    //  * 
    //  * @return item's descriptor node
    //  */
    // public DescriptorIndexNode getDescriptorNode() {
    //     return this.descriptorIndexNode;
    // }

    // /**
    //  * get the descriptor identifier for this item
    //  * can be used for loading objects through detectAndLoadPSTObject(PSTFile
    //  * theFile, long descriptorIndex)
    //  * 
    //  * @return item's descriptor node identifier
    //  */
    // public long getDescriptorNodeId() {
    //     if (this.descriptorIndexNode != null) { // Prevent null pointer
    //                                             // exceptions for embedded
    //                                             // messages
    //         return this.descriptorIndexNode.descriptorIdentifier;
    //     }
    //     return 0;
    // }

    // public int getNodeType() {
    //     return PSTObject.getNodeType(this.descriptorIndexNode.descriptorIdentifier);
    // }

    // public static int getNodeType(final int descriptorIdentifier) {
    //     return descriptorIdentifier & 0x1F;
    // }

    // protected int getIntItem(final int identifier) {
    //     return this.getIntItem(identifier, 0);
    // }

    // protected int getIntItem(final int identifier, final int defaultValue) {
    //     if (this.items.containsKey(identifier)) {
    //         final PSTTableBCItem item = this.items.get(identifier);
    //         return item.entryValueReference;
    //     }
    //     return defaultValue;
    // }

    // protected boolean getBooleanItem(final int identifier) {
    //     return this.getBooleanItem(identifier, false);
    // }

    // protected boolean getBooleanItem(final int identifier, final boolean defaultValue) {
    //     if (this.items.containsKey(identifier)) {
    //         final PSTTableBCItem item = this.items.get(identifier);
    //         return item.entryValueReference != 0;
    //     }
    //     return defaultValue;
    // }

    // protected double getDoubleItem(final int identifier) {
    //     return this.getDoubleItem(identifier, 0);
    // }

    // protected double getDoubleItem(final int identifier, final double defaultValue) {
    //     if (this.items.containsKey(identifier)) {
    //         final PSTTableBCItem item = this.items.get(identifier);
    //         final long longVersion = PSTObject.convertLittleEndianBytesToLong(item.data);
    //         return Double.longBitsToDouble(longVersion);
    //     }
    //     return defaultValue;
    // }

    // protected long getLongItem(final int identifier) {
    //     return this.getLongItem(identifier, 0);
    // }

    // protected long getLongItem(final int identifier, final long defaultValue) {
    //     if (this.items.containsKey(identifier)) {
    //         final PSTTableBCItem item = this.items.get(identifier);
    //         if (item.entryValueType == 0x0003) {
    //             // we are really just an int
    //             return item.entryValueReference;
    //         } else if (item.entryValueType == 0x0014) {
    //             // we are a long
    //             if (item.data != null && item.data.length == 8) {
    //                 return PSTObject.convertLittleEndianBytesToLong(item.data, 0, 8);
    //             } else {
    //                 System.err.printf("Invalid data length for long id 0x%04X\n", identifier);
    //                 // Return the default value for now...
    //             }
    //         }
    //     }
    //     return defaultValue;
    // }

    // protected String getStringItem(final int identifier) {
    //     return this.getStringItem(identifier, 0);
    // }

    // protected String getStringItem(final int identifier, final int stringType) {
    //     return this.getStringItem(identifier, stringType, null);
    // }

    // protected String getStringItem(final int identifier, int stringType, String codepage) {
    //     final PSTTableBCItem item = this.items.get(identifier);
    //     if (item != null) {

    //         if (codepage == null) {
    //             codepage = this.getStringCodepage();
    //         }

    //         // get the string type from the item if not explicitly set
    //         if (stringType == 0) {
    //             stringType = item.entryValueType;
    //         }

    //         // see if there is a descriptor entry
    //         if (!item.isExternalValueReference) {
    //             // System.out.println("here: "+new
    //             // String(item.data)+this.descriptorIndexNode.descriptorIdentifier);
    //             return PSTObject.createJavaString(item.data, stringType, codepage);
    //         }
    //         if (this.localDescriptorItems != null && this.localDescriptorItems.containsKey(item.entryValueReference)) {
    //             // we have a hit!
    //             final PSTDescriptorItem descItem = this.localDescriptorItems.get(item.entryValueReference);

    //             try {
    //                 final byte[] data = descItem.getData();
    //                 if (data == null) {
    //                     return "";
    //                 }

    //                 return PSTObject.createJavaString(data, stringType, codepage);
    //             } catch (final Exception e) {
    //                 System.err.printf("Exception %s decoding string %s: %s\n", e.toString(),
    //                     PSTFile.getPropertyDescription(identifier, stringType),
    //                     this.data != null ? this.data.toString() : "null");
    //                 return "";
    //             }
    //             // System.out.printf("PSTObject.getStringItem - item isn't a
    //             // string: 0x%08X\n", identifier);
    //             // return "";
    //         }

    //         return PSTObject.createJavaString(this.data, stringType, codepage);
    //     }
    //     return "";
    // }

    // static String createJavaString(final byte[] data, final int stringType, String codepage) {
    //     try {
    //         if (stringType == 0x1F) {
    //             return new String(data, "UTF-16LE");
    //         }

    //         if (codepage == null) {
    //             return new String(data);
    //         } else {
    //             codepage = codepage.toUpperCase(Locale.US);
    //             if (codepage.contentEquals("ISO-8859-8-I")) {   //  Outlook hebrew encoding is not supported by Java
    //                 codepage = "ISO-8859-8";      // next best thing is hebrew characters with wrong order
    //             }
    //             try {
    //                 return new String(data, codepage);
    //             } catch (UnsupportedEncodingException e) {
    //                 return new String(data, "UTF-8");
    //             }
    //         }
    //         /*
    //          * if (codepage == null || codepage.toUpperCase().equals("UTF-8") ||
    //          * codepage.toUpperCase().equals("UTF-7")) {
    //          * // PST UTF-8 strings are not... really UTF-8
    //          * // it seems that they just don't use multibyte chars at all.
    //          * // indeed, with some crylic chars in there, the difficult chars
    //          * are just converted to %3F(?)
    //          * // I suspect that outlook actually uses RTF to store these
    //          * problematic strings.
    //          * StringBuffer sbOut = new StringBuffer();
    //          * for (int x = 0; x < data.length; x++) {
    //          * sbOut.append((char)(data[x] & 0xFF)); // just blindly accept the
    //          * byte as a UTF char, seems right half the time
    //          * }
    //          * return new String(sbOut);
    //          * } else {
    //          * codepage = codepage.toUpperCase();
    //          * return new String(data, codepage);
    //          * }
    //          */
    //     } catch (final Exception err) {
    //         System.err.println("Unable to decode string");
    //         err.printStackTrace();
    //         return "";
    //     }
    // }

    // private String getStringCodepage() {
    //     // try and get the codepage
    //     PSTTableBCItem cpItem = this.items.get(0x3FFD); // PidTagMessageCodepage
    //     if (cpItem == null) {
    //         cpItem = this.items.get(0x3FDE); // PidTagInternetCodepage
    //     }
    //     if (cpItem != null) {
    //         return PSTFile.getInternetCodePageCharset(cpItem.entryValueReference);
    //     }
    //     return null;
    // }

    // public Date getDateItem(final int identifier) {
    //     if (this.items.containsKey(identifier)) {
    //         final PSTTableBCItem item = this.items.get(identifier);
    //         if (item.data.length == 0) {
    //             return new Date(0);
    //         }
    //         final int high = (int) PSTObject.convertLittleEndianBytesToLong(item.data, 4, 8);
    //         final int low = (int) PSTObject.convertLittleEndianBytesToLong(item.data, 0, 4);

    //         return PSTObject.filetimeToDate(high, low);
    //     }
    //     return null;
    // }

    // protected byte[] getBinaryItem(final int identifier) {
    //     if (this.items.containsKey(identifier)) {
    //         final PSTTableBCItem item = this.items.get(identifier);
    //         if (item.entryValueType == 0x0102) {
    //             if (!item.isExternalValueReference) {
    //                 return item.data;
    //             }
    //             if (this.localDescriptorItems != null
    //                 && this.localDescriptorItems.containsKey(item.entryValueReference)) {
    //                 // we have a hit!
    //                 final PSTDescriptorItem descItem = this.localDescriptorItems.get(item.entryValueReference);
    //                 try {
    //                     return descItem.getData();
    //                 } catch (final Exception e) {
    //                     System.err.printf("Exception reading binary item: reference 0x%08X\n",
    //                         item.entryValueReference);

    //                     return null;
    //                 }
    //             }

    //             // System.out.println("External reference!!!\n");
    //         }
    //     }
    //     return null;
    // }

    // protected PSTTimeZone getTimeZoneItem(final int identifier) {
    //     final byte[] tzData = this.getBinaryItem(identifier);
    //     if (tzData != null && tzData.length != 0) {
    //         return new PSTTimeZone(tzData);
    //     }
    //     return null;
    // }

    // public String getMessageClass() {
    //     return this.getStringItem(0x001a);
    // }

    // @Override
    // public String toString() {
    //     return this.localDescriptorItems + "\n" + (this.items);
    // }

    // /**
    //  * These are the common properties, some don't really appear to be common
    //  * across folders and emails, but hey
    //  */

    // /**
    //  * get the display name
    //  */
    // public String getDisplayName() {
    //     return this.getStringItem(0x3001);
    // }

    // /**
    //  * Address type
    //  * Known values are SMTP, EX (Exchange) and UNKNOWN
    //  */
    // public String getAddrType() {
    //     return this.getStringItem(0x3002);
    // }

    // /**
    //  * E-mail address
    //  */
    // public String getEmailAddress() {
    //     return this.getStringItem(0x3003);
    // }

    // /**
    //  * Comment
    //  */
    // public String getComment() {
    //     return this.getStringItem(0x3004);
    // }

    // /**
    //  * Creation time
    //  */
    // public Date getCreationTime() {
    //     return this.getDateItem(0x3007);
    // }

    // /**
    //  * Modification time
    //  */
    // public Date getLastModificationTime() {
    //     return this.getDateItem(0x3008);
    // }

    // /**
    //  * Static stuff below
    //  * ------------------
    //  */

    // /**
    //  * Output a number in a variety of formats for easier consumption
    //  * 
    //  * @param data
    //  */
    // public static void printFormattedNumber(final String pref, final long number) {
    //     System.out.print(pref);
    //     printFormattedNumber(number);
    // }

    // public static void printFormattedNumber(final long number) {
    //     System.out.print("dec: ");
    //     System.out.print(number);
    //     System.out.print(", hex: ");
    //     System.out.print(Long.toHexString(number));
    //     System.out.print(", bin: ");
    //     System.out.println(Long.toBinaryString(number));
    // }

    public getPropertyName(propertyId: number, bNamed: boolean): string {

        return this.propertyName.get(propertyId);
        // return propertyId.toString(16);

        // if (bFirstTime) {
        //     bFirstTime = false;
        //     propertyNames = new Properties();
        //     try {
        //         final InputStream propertyStream = PSTFile.class.getResourceAsStream("/PropertyNames.txt");
        //         if (propertyStream != null) {
        //             propertyNames.load(propertyStream);
        //         } else {
        //             propertyNames = null;
        //         }
        //     } catch (final FileNotFoundException e) {
        //         propertyNames = null;
        //         e.printStackTrace();
        //     } catch (final IOException e) {
        //         propertyNames = null;
        //         e.printStackTrace();
        //     }
        // }

        // if (propertyNames != null) {
        //     final String key = String.format((bNamed ? "%08X" : "%04X"), propertyId);
        //     return propertyNames.getProperty(key);
        // }

        // return null;
    }

    public getNameToIdMapKey(id: number): number {
        return -1;
        // let i = idToName.get(id);
        // if (i == null) {
        //     // throw new PSTException("Name to Id mapping not found");
        //     return -1;
        // }
        // return i;
    }

    public getPropertyDescription(entryType: number, entryValueType: number): string {
        let ret = "";
        debugger;
        if (entryType < 0x8000) {
            let name = this.getPropertyName(entryType, false);
            if (name != null) {
                ret = name + ':' + entryValueType.toString(16) + ':'; // String.format("%s:%04X: ", name, entryValueType);
            } else {
                ret = entryType.toString(16) + ':' + entryValueType.toString(16) + ':'; // String.format("0x%04X:%04X: ", entryType, entryValueType);
            }
        } else {
            let type = this.getNameToIdMapKey(entryType);
            if (type == -1) {
                ret = '0xFFFF(' + entryType.toString(16) + '):' +  entryValueType.toString(16) + ':'; // String.format("0xFFFF(%04X):%04X: ", entryType, entryValueType);
            } else {
                let name = this.getPropertyName(type, true);
                if (name != null) {
                    ret = name + '(' + entryType.toString(16) + '):' +  entryValueType.toString(16) + ':'; // String.format("%s(%04X):%04X: ", name, entryType, entryValueType);
                } else {
                    ret = '0x' + type.toString(16) + '(' + entryType.toString(16) + '):' +  entryValueType.toString(16) + ':'; // String.format("0x%04X(%04X):%04X: ", type, entryType, entryValueType);
                }
            }
        }

        return ret;
    }


    protected arraycopy(src: Buffer, srcPos: number, dest: Buffer, destPos: number, length: number) {
        // FIX THIS - TOO SLOW?
        let s = srcPos;
        let d = destPos;
        let i = 0;
        while(i++ < length) {
            dest[d++] = src[s++];
        }
    }

    // determine if character is alphanumeric
    protected isAlphaNumeric = (ch: string) => {
        return ch.match(/^[a-z0-9]+$/i) !== null;
    }

    // Output a dump of data in hex format in the order it was read in
    protected printHexFormatted(data: Buffer, pretty: boolean, indexes?: number[]) {

        if (!indexes) {
            indexes = [0];
        }

        // groups of two
        if (pretty) {
            console.log("---");
        }
        let tmpLongValue;
        let line = "";
        let nextIndex = 0;
        let indexIndex = 0;
        if (indexes.length > 0) {
            nextIndex = indexes[0];
            indexIndex++;
        }
        for (let x = 0; x < data.length; x++) {
            tmpLongValue = data[x] & 0xff;

            if (indexes.length > 0 && x == nextIndex && nextIndex < data.length) {
                console.log("+");
                line += "+";
                while (indexIndex < indexes.length - 1 && indexes[indexIndex] <= nextIndex) {
                    indexIndex++;
                }
                nextIndex = indexes[indexIndex];
                // indexIndex++;
            }

            if (this.isAlphaNumeric(tmpLongValue.toString())) {
                line += tmpLongValue;
            } else {
                line += ".";
            }

            // if (Long.toHexString(tmpLongValue).length() < 2) {
            //     System.out.print("0");
            // }
            console.log(tmpLongValue.toString(16));
            if (x % 2 == 1 && pretty) {
                console.log(" ");
            }
            if (x % 16 == 15 && pretty) {
                console.log(" " + line);
                console.log("");
                line = "";
            }
        }
        if (pretty) {
            console.log(" " + line);
            console.log("---");
            console.log(data.length);
        } else {
        }
    }

    // decode a lump of data that has been encrypted with the compressible encryption
    protected decode(data: Buffer): Buffer {
        let temp;
        for (let x = 0; x < data.length; x++) {
            temp = data[x] & 0xff;
            data[x] = this.compEnc[temp];
        }

        return data;
    }

    // protected static byte[] encode(final byte[] data) {
    //     // create the encoding array...
    //     final int[] enc = new int[compEnc.length];
    //     for (int x = 0; x < enc.length; x++) {
    //         enc[compEnc[x]] = x;
    //     }

    //     // now it's just the same as decode...
    //     int temp;
    //     for (int x = 0; x < data.length; x++) {
    //         temp = data[x] & 0xff;
    //         data[x] = (byte) enc[temp];
    //     }

    //     return data;
    // }

    // convert little endian bytes to number (long)
    public static convertLittleEndianBytesToLong(data: Buffer, start?: number, end?: number) {

        if (!start) {
            start = 0;
        }
        if (!end) {
            end = data.length;
        }

        let offset = data[end - 1] & 0xff;
        let tmpLongValue;
        for (let x = end - 2; x >= start; x--) {
            offset = offset << 8;
            tmpLongValue = data[x] & 0xff;
            offset |= tmpLongValue;
        }

        // console.log("PSTObject: convertLittleEndianBytesToLong = %d", offset);
        
        return offset;
    }

    // /**
    //  * Utility function for converting big endian bytes into a usable java long
    //  * 
    //  * @param data
    //  * @param start
    //  * @param end
    //  * @return long version of the data
    //  */
    // public static long convertBigEndianBytesToLong(final byte[] data, final int start, final int end) {

    //     long offset = 0;
    //     for (int x = start; x < end; ++x) {
    //         offset = offset << 8;
    //         offset |= (data[x] & 0xFFL);
    //     }

    //     return offset;
    // }
    // /*
    //  * protected static boolean isPSTArray(byte[] data) {
    //  * return (data[0] == 1 && data[1] == 1);
    //  * }
    //  * /
    //  **/
    // /*
    //  * protected static int[] getBlockOffsets(RandomAccessFile in, byte[] data)
    //  * throws IOException, PSTException
    //  * {
    //  * // is the data an array?
    //  * if (!(data[0] == 1 && data[1] == 1))
    //  * {
    //  * throw new
    //  * PSTException("Unable to process array, does not appear to be one!");
    //  * }
    //  * 
    //  * // we are an array!
    //  * // get the array items and merge them together
    //  * int numberOfEntries = (int)PSTObject.convertLittleEndianBytesToLong(data,
    //  * 2, 4);
    //  * int[] output = new int[numberOfEntries];
    //  * int tableOffset = 8;
    //  * int blockOffset = 0;
    //  * for (int y = 0; y < numberOfEntries; y++) {
    //  * // get the offset identifier
    //  * long tableOffsetIdentifierIndex =
    //  * PSTObject.convertLittleEndianBytesToLong(data, tableOffset,
    //  * tableOffset+8);
    //  * // clear the last bit of the identifier. Why so hard?
    //  * tableOffsetIdentifierIndex = (tableOffsetIdentifierIndex & 0xfffffffe);
    //  * OffsetIndexItem tableOffsetIdentifier = PSTObject.getOffsetIndexNode(in,
    //  * tableOffsetIdentifierIndex);
    //  * blockOffset += tableOffsetIdentifier.size;
    //  * output[y] = blockOffset;
    //  * tableOffset += 8;
    //  * }
    //  * 
    //  * // replace the item data with the stuff from the array...
    //  * return output;
    //  * }
    //  * /
    //  **/

    // /**
    //  * Detect and load a PST Object from a file with the specified descriptor
    //  * index
    //  * 
    //  * @param theFile
    //  * @param descriptorIndex
    //  * @return PSTObject with that index
    //  * @throws IOException
    //  * @throws PSTException
    //  */
    // public static PSTObject detectAndLoadPSTObject(final PSTFile theFile, final long descriptorIndex)
    //     throws IOException, PSTException {
    //     return PSTObject.detectAndLoadPSTObject(theFile, theFile.getDescriptorIndexNode(descriptorIndex));
    // }

    // /**
    //  * Detect and load a PST Object from a file with the specified descriptor
    //  * index
    //  * 
    //  * @param theFile
    //  * @param folderIndexNode
    //  * @return PSTObject with that index
    //  * @throws IOException
    //  * @throws PSTException
    //  */
    // static PSTObject detectAndLoadPSTObject(final PSTFile theFile, final DescriptorIndexNode folderIndexNode)
    //     throws IOException, PSTException {
    //     final int nidType = (folderIndexNode.descriptorIdentifier & 0x1F);
    //     if (nidType == 0x02 || nidType == 0x03 || nidType == 0x04) {

    //         final PSTTableBC table = new PSTTableBC(
    //             new PSTNodeInputStream(theFile, theFile.getOffsetIndexNode(folderIndexNode.dataOffsetIndexIdentifier)));

    //         HashMap<Integer, PSTDescriptorItem> localDescriptorItems = null;
    //         if (folderIndexNode.localDescriptorsOffsetIndexIdentifier != 0) {
    //             localDescriptorItems = theFile
    //                 .getPSTDescriptorItems(folderIndexNode.localDescriptorsOffsetIndexIdentifier);
    //         }

    //         if (nidType == 0x02 || nidType == 0x03) {
    //             return new PSTFolder(theFile, folderIndexNode, table, localDescriptorItems);
    //         } else {
    //             return PSTObject.createAppropriatePSTMessageObject(theFile, folderIndexNode, table,
    //                 localDescriptorItems);
    //         }
    //     } else {
    //         throw new PSTException(
    //             "Unknown child type with offset id: " + folderIndexNode.localDescriptorsOffsetIndexIdentifier);
    //     }
    // }

    // static PSTMessage createAppropriatePSTMessageObject(final PSTFile theFile,
    //     final DescriptorIndexNode folderIndexNode, final PSTTableBC table,
    //     final HashMap<Integer, PSTDescriptorItem> localDescriptorItems) {

    //     final PSTTableBCItem item = table.getItems().get(0x001a);
    //     String messageClass = "";
    //     if (item != null) {
    //         messageClass = item.getStringValue();
    //     }

    //     if (messageClass.equals("IPM.Note")
    //         || messageClass.equals("IPM.Note.SMIME.MultipartSigned")) {
    //         return new PSTMessage(theFile, folderIndexNode, table, localDescriptorItems);
    //     } else if (messageClass.equals("IPM.Appointment")
    //         || messageClass.equals("IPM.OLE.CLASS.{00061055-0000-0000-C000-000000000046}")
    //         || messageClass.startsWith("IPM.Schedule.Meeting")) {
    //         return new PSTAppointment(theFile, folderIndexNode, table, localDescriptorItems);
    //     } else if (messageClass.equals("IPM.Contact")) {
    //         return new PSTContact(theFile, folderIndexNode, table, localDescriptorItems);
    //     } else if (messageClass.equals("IPM.Task")) {
    //         return new PSTTask(theFile, folderIndexNode, table, localDescriptorItems);
    //     } else if (messageClass.equals("IPM.Activity")) {
    //         return new PSTActivity(theFile, folderIndexNode, table, localDescriptorItems);
    //     } else if (messageClass.equals("IPM.Post.Rss")) {
    //         return new PSTRss(theFile, folderIndexNode, table, localDescriptorItems);
    //     } else if (messageClass.equals("IPM.DistList")) {
    //         return new PSTDistList(theFile, folderIndexNode, table, localDescriptorItems);
    //     } else {
    //         System.err.println("Unknown message type: " + messageClass);
    //     }

    //     return new PSTMessage(theFile, folderIndexNode, table, localDescriptorItems);
    // }

    // static String guessPSTObjectType(final PSTFile theFile, final DescriptorIndexNode folderIndexNode)
    //     throws IOException, PSTException {

    //     final PSTTableBC table = new PSTTableBC(
    //         new PSTNodeInputStream(theFile, theFile.getOffsetIndexNode(folderIndexNode.dataOffsetIndexIdentifier)));

    //     // get the table items and look at the types we are dealing with
    //     final Set<Integer> keySet = table.getItems().keySet();
    //     final Iterator<Integer> iterator = keySet.iterator();

    //     while (iterator.hasNext()) {
    //         final Integer key = iterator.next();
    //         if (key.intValue() >= 0x0001 && key.intValue() <= 0x0bff) {
    //             return "Message envelope";
    //         } else if (key.intValue() >= 0x1000 && key.intValue() <= 0x2fff) {
    //             return "Message content";
    //         } else if (key.intValue() >= 0x3400 && key.intValue() <= 0x35ff) {
    //             return "Message store";
    //         } else if (key.intValue() >= 0x3600 && key.intValue() <= 0x36ff) {
    //             return "Folder and address book";
    //         } else if (key.intValue() >= 0x3700 && key.intValue() <= 0x38ff) {
    //             return "Attachment";
    //         } else if (key.intValue() >= 0x3900 && key.intValue() <= 0x39ff) {
    //             return "Address book";
    //         } else if (key.intValue() >= 0x3a00 && key.intValue() <= 0x3bff) {
    //             return "Messaging user";
    //         } else if (key.intValue() >= 0x3c00 && key.intValue() <= 0x3cff) {
    //             return "Distribution list";
    //         }
    //     }
    //     return "Unknown";
    // }

    // /**
    //  * the code below was taken from a random apache project
    //  * http://www.koders.com/java/fidA9D4930E7443F69F32571905DD4CA01E4D46908C.aspx
    //  * my bit-shifting isn't that 1337
    //  */

    // /**
    //  * <p>
    //  * The difference between the Windows epoch (1601-01-01
    //  * 00:00:00) and the Unix epoch (1970-01-01 00:00:00) in
    //  * milliseconds: 11644473600000L. (Use your favorite spreadsheet
    //  * program to verify the correctness of this value. By the way,
    //  * did you notice that you can tell from the epochs which
    //  * operating system is the modern one? :-))
    //  * </p>
    //  */
    // private static final long EPOCH_DIFF = 11644473600000L;

    // /**
    //  * <p>
    //  * Converts a Windows FILETIME into a {@link Date}. The Windows
    //  * FILETIME structure holds a date and time associated with a
    //  * file. The structure identifies a 64-bit integer specifying the
    //  * number of 100-nanosecond intervals which have passed since
    //  * January 1, 1601. This 64-bit value is split into the two double
    //  * words stored in the structure.
    //  * </p>
    //  *
    //  * @param high
    //  *            The higher double word of the FILETIME structure.
    //  * @param low
    //  *            The lower double word of the FILETIME structure.
    //  * @return The Windows FILETIME as a {@link Date}.
    //  */
    // protected static Date filetimeToDate(final int high, final int low) {
    //     final long filetime = ((long) high) << 32 | (low & 0xffffffffL);
    //     // System.out.printf("0x%X\n", filetime);
    //     final long ms_since_16010101 = filetime / (1000 * 10);
    //     final long ms_since_19700101 = ms_since_16010101 - EPOCH_DIFF;
    //     return new Date(ms_since_19700101);
    // }

    // public static Calendar apptTimeToCalendar(final int minutes) {
    //     final long ms_since_16010101 = minutes * (60 * 1000L);
    //     final long ms_since_19700101 = ms_since_16010101 - EPOCH_DIFF;
    //     final Calendar c = Calendar.getInstance(PSTTimeZone.utcTimeZone);
    //     c.setTimeInMillis(ms_since_19700101);
    //     return c;
    // }

    // public static Calendar apptTimeToUTC(final int minutes, final PSTTimeZone tz) {
    //     // Must convert minutes since 1/1/1601 in local time to UTC
    //     // There's got to be a better way of doing this...
    //     // First get a UTC calendar object that contains _local time_
    //     final Calendar cUTC = PSTObject.apptTimeToCalendar(minutes);
    //     if (tz != null) {
    //         // Create an empty Calendar object with the required time zone
    //         final Calendar cLocal = Calendar.getInstance(tz.getSimpleTimeZone());
    //         cLocal.clear();

    //         // Now transfer the local date/time from the UTC calendar object
    //         // to the object that knows about the time zone...
    //         cLocal.set(cUTC.get(Calendar.YEAR), cUTC.get(Calendar.MONTH), cUTC.get(Calendar.DATE),
    //             cUTC.get(Calendar.HOUR_OF_DAY), cUTC.get(Calendar.MINUTE), cUTC.get(Calendar.SECOND));

    //         // Get the true UTC from the local time calendar object.
    //         // Drop any milliseconds, they won't be printed anyway!
    //         final long utcs = cLocal.getTimeInMillis() / 1000;

    //         // Finally, set the true UTC in the UTC calendar object
    //         cUTC.setTimeInMillis(utcs * 1000);
    //     } // else hope for the best!

    //     return cUTC;
    // }
}